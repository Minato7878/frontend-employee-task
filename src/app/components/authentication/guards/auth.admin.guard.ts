import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CustomAuthService } from '../custom-auth.service';
import { UserDto } from "../../../model/authentication/user.model";

@Injectable({ providedIn: 'root' })
export class AuthAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: CustomAuthService,
  ) { }

  account: UserDto;

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.checkLoggedUser();
    if (currentUser) {
      this.account = await this.authenticationService.getCurrentUser().toPromise();
      if (this.account.role === 'MODERATOR' || this.account.role === 'ADMIN') {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}