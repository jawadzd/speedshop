import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from '../../features/feature.component';
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'feature', pathMatch: 'full' },
  { path: 'feature', component: FeatureComponent, loadChildren: () => import('../../features/features.module').then(m => m.FeaturesModule) },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
