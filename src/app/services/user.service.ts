import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];

  constructor() {
    const user1 = new User(
      'Sirus_76',
      'password123',
      'Sirus Vali',
      'sirus@mail.com',
      '1234567890',
      'User',
      'Male'
    );

    const user2 = new User(
      'Milad_Rez',
      'securePassword',
      'Milad Rezvani',
      'Milad@mail.com',
      '9876543210',
      'Admin',
      'Male'
    );

    const user3 = new User(
      'Mary55',
      'pass1234',
      'Maryam Fouladi',
      'mary@mail.com',
      '5555555555',
      'User',
      'Female'
    );
    const user4 = new User(
      'Amir',
      'amirPass',
      'Amir Naderi',
      'amir@mail.com',
      '2514523698',
      'User',
      'Male'
    );
    const user5 = new User(
      'Mani',
      'pass1234',
      'Mani Asadi',
      'mani@mail.com',
      '6666666666',
      'User',
      'Male'
    );
    const user6 = new User(
      'Zahra_81',
      'khedmati1234',
      'Zahra Khedmati',
      'mary@mail.com',
      '6987595981',
      'Admin',
      'Female'
    );
    const user7 = new User(
      'Mina2020',
      'pass1234',
      'Mina Fouladi',
      'mina@mail.com',
      '2145879632',
      'User',
      'Female'
    );
    const user8 = new User(
      'Hasan',
      'Hasan1234',
      'Hasan Hasani',
      'hasan@mail.com',
      '0201459867',
      'User',
      'Male'
    );
    const user9 = new User(
      'Sima',
      'password1234',
      'Sima Majidi',
      'sima@mail.com',
      '1478965236',
      'Admin',
      'Female'
    );
    const user10 = new User(
      'Majid',
      'pass1234',
      'Majid Hoseini',
      'hoseini@mail.com',
      '1678549532',
      'Admin',
      'Male'
    );

    this.addUser(user10);
    this.addUser(user9);
    this.addUser(user8);
    this.addUser(user7);
    this.addUser(user6);
    this.addUser(user5);
    this.addUser(user4);
    this.addUser(user3);
    this.addUser(user2);
    this.addUser(user1);
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    this.users.unshift(user);
  }

  deleteUser(userId: number): void {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  isUsernameUnique(username: string): boolean {
    return this.users.every((user) => user.username !== username);
  }

  authenticateUser(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    return !!user;
  }

  getUserFullName(username: string): string | undefined {
    const user = this.users.find((u) => u.username === username);
    return user?.fullName;
  }
}
