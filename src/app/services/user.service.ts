import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];

  saveUser(user: User): void {
    const userExists = this.users.some((item) => item.email === user.email || item.phone === user.phone);

    if (userExists) {
      throw new Error('User already exists!');
    }

    this.users.push(user);
  }

  getUsers(): User[] {
    return this.users;
  }
}
