import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from '../../features/feature.component';

const routes: Routes = [
  { path: '', redirectTo: 'feature', pathMatch: 'full' },
  { path: 'feature', component: FeatureComponent, loadChildren: () => import('../../features/features.module').then(m => m.FeaturesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
