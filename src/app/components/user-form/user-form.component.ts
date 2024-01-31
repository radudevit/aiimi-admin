import { Component } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
}
