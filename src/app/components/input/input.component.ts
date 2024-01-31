import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef, EventEmitter,
  forwardRef,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { noop, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() group: boolean = true;
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();

  isActive: boolean = false;
  formControl: FormControl = new FormControl<string>('');
  destroyRef: DestroyRef = inject(DestroyRef);
  onChange: (value: string) => void = noop;
  onTouch: () => void = noop;

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  writeValue(value: string): void {
    this.formControl.setValue(value, { emitEvent: false });
  }

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(
        tap(value => this.onChange(value)),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
  }

  inputFocus() {
    this.isActive = true;
    this.focus.emit();
  }

  inputBlur() {
    this.isActive = false;
    this.blur.emit();
  }
}
