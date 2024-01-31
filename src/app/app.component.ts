import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AlertComponent } from './components/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    AutocompleteComponent,
    UserCardComponent,
    UserFormComponent,
    AlertComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly userService: UserService = inject(UserService);
  showUserForm: boolean = false;
  allUsers: User[] = this.userService.getUsers();
  filteredUsers: User[] = this.allUsers;
  formGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  alertMessage: string = '';

  setSelectedUsers(users: User[]): void {
    this.filteredUsers = users;
  }

  submit(): void {
    if (this.formGroup.invalid) {
      this.alertMessage = 'Please Fill in all fields!';
    } else {
      try {
        this.userService.saveUser(this.formGroup.value as User);
        this.alertMessage = 'New user added!';
        this.showUserForm = false;
        this.formGroup.reset();
      } catch (e: any) {
        this.alertMessage = e;
      }
    }
  }
}
