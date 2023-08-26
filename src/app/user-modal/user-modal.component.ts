import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
})
export class UserModalComponent implements OnInit {
  newUser: User = new User('', '', '', '', '', '', '');

  emailError: boolean = false;
  passwordError: boolean = false;
  nationalNumberError: boolean = false;
  userTypeError: boolean = false;
  genderError: boolean = false;
  fullNameError: boolean = false;
  usernameError: boolean = false;

  passwordVisible: boolean = false;

  addUserClicked: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  validateEmail(email: string): boolean {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    this.emailError = !emailRegex.test(email);
    return this.emailError;
  }

  validatePassword(password: string): boolean {
    this.passwordError = password.length < 8;
    return this.passwordError;
  }

  validateNationalNumber(nationalNumber: string): boolean {
    const nationalNumberPattern = /^\d{10}$/;
    const nationalNumberStr = nationalNumber;
    const isValid = nationalNumberPattern.test(nationalNumberStr);
    this.nationalNumberError = !isValid;
    return !isValid;
  }

  // restrictInputLength(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.value.length > 10) {
  //     inputElement.value = inputElement.value.slice(0, 10);
  //   }
  // }

  addUser(): void {
    this.addUserClicked = true;
    this.emailError = this.validateEmail(this.newUser.email);
    this.passwordError = this.validatePassword(this.newUser.password);
    this.nationalNumberError = this.validateNationalNumber(
      this.newUser.nationalNumber
    );
    this.userTypeError = !this.newUser.userType;
    this.genderError = !this.newUser.gender;
    this.fullNameError = !this.newUser.fullName;
    this.usernameError =
      !this.newUser.username ||
      !this.userService.isUsernameUnique(this.newUser.username);
    if (
      !this.emailError &&
      !this.passwordError &&
      !this.nationalNumberError &&
      !this.userTypeError &&
      !this.genderError
    ) {
      if (
        this.newUser.username &&
        this.newUser.password &&
        this.newUser.fullName &&
        this.newUser.nationalNumber &&
        this.newUser.userType &&
        this.newUser.gender &&
        this.userService.isUsernameUnique(this.newUser.username)
      ) {
        this.userService.addUser(this.newUser);
        this.dialogRef.close(true);
      }
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
