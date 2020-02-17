import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/authentication/guards/auth.guard';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { AccountComponent } from './components/authentication/account/account.component';
import { EmpAddComponent } from './components/emp-add/emp-add.component';
import { EmpEditComponent } from './components/emp-edit/emp-edit.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'emp-add', component: EmpAddComponent, canActivate: [AuthGuard]},
  { path: 'emp-edit/:id', component: EmpEditComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
