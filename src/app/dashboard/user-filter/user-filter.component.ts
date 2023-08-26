import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css'],
})
export class UserFilterComponent implements OnInit {
  @Output() filteredUsersChange: EventEmitter<User[]> = new EventEmitter<
    User[]
  >();

  usernameFilter: string = '';
  fullnameFilter: string = '';
  nationalNumberFilter: string = '';
  userTypeUserFilter: boolean = false;
  userTypeAdminFilter: boolean = false;
  maleFilter: boolean = false;
  femaleFilter: boolean = false;
  filteredUsers: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.filteredUsers = this.userService.getUsers();
  }

  applyFilters(): void {
    console.log('Male Filter:', this.maleFilter);
    console.log('Female Filter:', this.femaleFilter);
    this.filteredUsers = this.userService.getUsers().filter((user) => {
      const nationalNumberMatch = user.nationalNumber.includes(
        this.nationalNumberFilter
      );
      const usernameMatch = user.username
        .toLowerCase()
        .includes(this.usernameFilter.toLowerCase());
      const fullnameMatch = user.fullName
        .toLowerCase()
        .includes(this.fullnameFilter.toLowerCase());
      // const userTypeUserMatch = this.userTypeUserFilter
      //   ? user.userType === 'User'
      //   : true;
      // const userTypeAdminMatch = this.userTypeAdminFilter
      //   ? user.userType === 'Admin'
      //   : true;
      const userTypeUserMatch =
        this.userTypeUserFilter ||
        (!this.userTypeUserFilter && !this.userTypeAdminFilter)
          ? user.userType === 'User'
          : false;
      const userTypeAdminMatch =
        this.userTypeAdminFilter ||
        (!this.userTypeUserFilter && !this.userTypeAdminFilter)
          ? user.userType === 'Admin'
          : false;
      const maleMatch =
        this.maleFilter || (!this.maleFilter && !this.femaleFilter)
          ? user.gender === 'Male'
          : false;
      const femaleMatch =
        this.femaleFilter || (!this.femaleFilter && !this.maleFilter)
          ? user.gender === 'Female'
          : false;

      console.log('User:', user.username);
      console.log('National Number Match:', nationalNumberMatch);
      console.log('Male Match:', maleMatch);
      console.log('Female Match:', femaleMatch);
      return (
        nationalNumberMatch &&
        (maleMatch || femaleMatch) &&
        usernameMatch &&
        fullnameMatch &&
        (userTypeUserMatch || userTypeAdminMatch)
      );
    });
    this.filteredUsersChange.emit(this.filteredUsers);
    console.log('Filtered Users:', this.filteredUsers);
  }
}
