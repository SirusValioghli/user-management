import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    const isValidUser = this.userService.authenticateUser(
      this.username,
      this.password
    );

    if (isValidUser) {
      this.loginError = false;
      // Store the username in local storage
      localStorage.setItem('loggedInUser', this.username);
      this.router.navigate(['/dashboard']); // Redirect to dashboard upon successful login
    } else {
      this.loginError = true;
    }
  }
}
