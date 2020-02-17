export class UserDto {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
 
  constructor(id: number, login: string, firstName: string, 
    lastName: string, email: string, role: string) {
    this.id = id;
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
  }
}
