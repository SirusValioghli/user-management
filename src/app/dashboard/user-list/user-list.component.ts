import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../../user-modal/user-modal.component';
import { UpdateUserComponent } from '../../update-user/update-user.component';
import { UserFilterComponent } from '../user-filter/user-filter.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getUsers();
  }

  openUserModal(): void {
    console.log('object');
    this.dialog.open(UserModalComponent, {
      width: '500px',
      data: {},
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId);
  }

  openUpdateModal(user: User) {
    this.dialog.open(UpdateUserComponent, {
      width: '500px',
      data: user,
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.loadUsers();
    //   }
    // });
  }

  updateFilteredUsers(filteredUsers: User[]): void {
    this.users = filteredUsers;
  }
}
