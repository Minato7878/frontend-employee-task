export class SignUpForm {
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(login: string, firstName: string, lastName: string, 
      email: string, password: string) {
        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
      }
}