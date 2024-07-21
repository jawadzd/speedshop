import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from '../../features/feature.component';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { authGuard } from '../auth/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'feature', pathMatch: 'full' },
  { path: 'feature', component: FeatureComponent, loadChildren: () => import('../../features/features.module').then(m => m.FeaturesModule) },
  { path: 'login', component: LoginComponent  , canActivate: [authGuard]},
  {path:'signup',component:SignupComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
