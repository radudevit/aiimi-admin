import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../models/user.model';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    HighlightPipe,
    ButtonComponent,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() items: User[] = [];
  @Output() itemSelect: EventEmitter<User[]> = new EventEmitter();

  filteredItems: User[] = [];
  searchControl: FormControl<string> = new UntypedFormControl('');
  active: boolean = false;
  private destroyRef: DestroyRef = inject(DestroyRef);
  private elementRef: ElementRef = inject(ElementRef);

  @HostListener('document:click', ['$event']) clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.active) {
      this.submit();
    }
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(searchValue => {
      if (searchValue.length < 2) {
        this.filteredItems = [];
      } else {
        searchValue = searchValue.toLowerCase();
        this.filteredItems = this.filterItems(searchValue);
      }
    });
  }

  submit(): void {
    const items = this.filteredItems.length ? this.filteredItems : this.filterItems(this.searchControl.value.toLowerCase());
    this.active = false;
    this.itemSelect.emit(items);
  }

  suggestionClick(item: User): void {
    this.active = false;
    this.itemSelect.emit([item]);
  }

  private filterItems(searchValue: string): User[] {
    return searchValue ? this.items.filter(item => `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchValue)) : this.items;
  }
}
