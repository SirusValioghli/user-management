import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  username: string = '';
  password: string = '';
  fullName: string = '';
  email: string = '';
  nationalNumber: string = '';
  userType: string = '';
  gender: string = '';

  passwordVisible: boolean = false;

  emailError: boolean = false;
  passwordError: boolean = false;
  nationalNumberError: boolean = false;
  userTypeError: boolean = false;
  genderError: boolean = false;
  fullNameError: boolean = false;

  addUserClicked: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public userToUpdate: User,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.username = this.userToUpdate.username;
    this.password = this.userToUpdate.password;
    this.fullName = this.userToUpdate.fullName;
    this.email = this.userToUpdate.email;
    this.nationalNumber = this.userToUpdate.nationalNumber;
    this.userType = this.userToUpdate.userType;
    this.gender = this.userToUpdate.gender;
  }

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

  updateUser(): void {
    this.addUserClicked = true;
    this.emailError = this.validateEmail(this.email);
    this.passwordError = this.validatePassword(this.password);
    this.nationalNumberError = this.validateNationalNumber(this.nationalNumber);
    this.userTypeError = !this.userType;
    this.genderError = !this.gender;
    this.fullNameError = !this.fullName;
    if (
      !this.emailError &&
      !this.passwordError &&
      !this.nationalNumberError &&
      !this.userTypeError &&
      !this.genderError
    ) {
      if (
        this.password &&
        this.fullName &&
        this.nationalNumber &&
        this.userType &&
        this.gender
      ) {
        // Update the properties of userToUpdate with the edited data
        this.userToUpdate.password = this.password;
        this.userToUpdate.fullName = this.fullName;
        this.userToUpdate.email = this.email;
        this.userToUpdate.nationalNumber = this.nationalNumber;
        this.userToUpdate.userType = this.userType;
        this.userToUpdate.gender = this.gender;

        // Call the UserService to update the user in the list
        this.userService.updateUser(this.userToUpdate);

        // Close the modal
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
