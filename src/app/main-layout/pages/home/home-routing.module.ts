import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { HomeComponent } from './home.component';
import { UserAuthGuard } from 'src/app/@shared/guards/user-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: mapToCanActivate([UserAuthGuard]),
  },
  {
    path: 'channel/:name',
    component: HomeComponent,
    canActivate: mapToCanActivate([UserAuthGuard]),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
