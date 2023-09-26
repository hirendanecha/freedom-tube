import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main-layout/main-layout.module').then(m => m.MainLayoutModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth-layout/auth-layout.module').then(m => m.AuthLayoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
