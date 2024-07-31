import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { authGuard } from '../auth/guards/auth.guard';
import { LoginGuard } from '../auth/guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'feature', pathMatch: 'full' },
  { 
    path: 'feature', 
    loadChildren: () => import('../../features/features.module').then(m => m.FeaturesModule) 
  },
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [LoginGuard] 
  },
  { 
    path: 'signup', 
    component: SignupComponent, 
    canActivate: [LoginGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
