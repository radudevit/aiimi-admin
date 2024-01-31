import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() styles: string = '';
  @Input() hasShadow: boolean = false;
  @Input() disabled: boolean = false;
}
