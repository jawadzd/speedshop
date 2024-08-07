import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { authGuard } from '../auth/guards/auth.guard';
import { LoginGuard } from '../auth/guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'feature', pathMatch: 'full' }, //choosing the default path
  {
    path: 'feature',
    loadChildren: () =>
      import('../../features/features.module').then((m) => m.FeaturesModule), //lazy loading the feature module
  },
  {
    path: 'login', //setting the login route
    component: LoginComponent,
    canActivate: [LoginGuard], //using the LoginGuard to protect the login route
  },
  {
    path: 'signup', //setting the signup route
    component: SignupComponent,
    canActivate: [LoginGuard], //using the LoginGuard to protect the signup route
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], //exporting the RouterModule
})
export class ShellRoutingModule {}
