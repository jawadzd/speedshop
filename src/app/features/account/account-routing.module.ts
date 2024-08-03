import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from '../../core/auth/guards/auth.guard';

const routes: Routes = [
  {path : '', redirectTo: 'profile', pathMatch: 'full'},
  {path : 'profile', canActivate: [authGuard],component: ProfileComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
