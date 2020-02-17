import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/model/authentication/user.model';
import { CustomAuthService } from '../custom-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountProfile: UserDto;
  role: string;

  constructor(private authService: CustomAuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(data => {
      this.accountProfile = data;
      this.role = data.role;
    }, err => {
      this.logout();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }

  initAcc(accountProfile: UserDto) {
    this.accountProfile = accountProfile;
  }

  editAccount() {
    this.router.navigate(['account_edit']);
  }

}
