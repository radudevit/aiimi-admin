import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() message: string = '';
  @Output() close: EventEmitter<void> = new EventEmitter();
}
