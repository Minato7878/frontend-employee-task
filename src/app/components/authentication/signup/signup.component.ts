import { Component, OnInit } from '@angular/core';
import { SignUpForm } from 'src/app/model/authentication/signup-form.model';
import { CustomAuthService } from '../custom-auth.service';
import { TokenStorageService } from '../token/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private signupInfo: SignUpForm;

  constructor(private authService: CustomAuthService,
    private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.signupInfo = new SignUpForm(this.model.login, this.model.firstName,
      this.model.lastName, this.model.email, this.model.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.router.navigate(['home']).then(e => {
          if (e) {
            console.log("Navigation is successful!");
          } else {
            console.log("Navigation has failed!");
          }
        });

      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
