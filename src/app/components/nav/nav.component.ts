import { Component, OnInit, HostListener } from '@angular/core';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserDto } from 'src/app/model/authentication/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomAuthService } from '../authentication/custom-auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  faSearch = faSearch;
  faBell = faBell;
  faUser = faUser;

  seek: string;

  accountProfile: UserDto;
  username = 'Sign In';

  constructor(private authService: CustomAuthService) {
    setTimeout(() => {
      this.ngOnInit();
    }, 400);
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(data => {
      this.accountProfile = data;
      if (data.id > 0) {
        this.username = data.login;
      }
    });
  }
}
