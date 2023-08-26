import { Component } from '@angular/core';
import * as jalaliMoment from 'jalali-moment';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  loggedInUserFullName: string | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Retrieve the stored username from local storage
    const loggedInUsername = localStorage.getItem('loggedInUser');
    if (loggedInUsername) {
      this.loggedInUserFullName =
        this.userService.getUserFullName(loggedInUsername);
    }
  }

  avatarImageUrl = '../../../assets/img/avatar.jpg';
  refreshButtonImageUrl = '../../../assets/img/refresh.png';

  currentDate: Date = new Date();

  getFormattedDate(): string {
    const formattedDate = jalaliMoment(this.currentDate).format('jYYYY/jM/jD');
    return formattedDate;
  }
}
