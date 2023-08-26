export class User {
  static lastId = 1000;

  constructor(
    public username: string,
    public password: string,
    public fullName: string,
    public email: string,
    public nationalNumber: string,
    public userType: string,
    public gender: string
  ) {
    this.id = ++User.lastId;
  }

  id: number;
}
