import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './core/app-shell/shell.component';

const routes: Routes = [
  { path: '', redirectTo: 'shell', pathMatch: 'full' },
  { path: 'shell', component: ShellComponent, loadChildren: () => import('./core/app-shell/shell.module').then(m => m.ShellModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
