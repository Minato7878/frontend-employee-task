import { Component, OnInit } from '@angular/core';
import { CustomAuthService } from '../custom-auth.service';
import { TokenStorageService } from '../token/token-storage.service';
import { SignInForm } from '../../../model/authentication/signin-form.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private loginInfo: SignInForm;

  constructor(private authService: CustomAuthService, private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    if(this.tokenStorage.getToken()!=null){
      this.router.navigate(['home']).then(e => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    }
  }

  onSubmit() {
    this.loginInfo = new SignInForm(
      this.loginForm.login,
      this.loginForm.password);

    this.authService.login(this.loginInfo).subscribe(
      data => {

        this.tokenStorage.saveToken(data);
        this.authService.getCurrentUser().subscribe(
          user => this.tokenStorage.saveAuthorities(user.role));

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
        this.errorMessage = error.error;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.scroll(0, 0);
    window.location.href = '/home';
  }

  googleSignIn() { }
  facebookSignIn() { }

}
