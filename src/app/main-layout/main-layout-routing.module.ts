import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { UploadVideoComponent } from './pages/upload-video/upload-video.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { UserAuthGuard } from '../@shared/guards/user-auth.guard';
import { UploadComponent } from './pages/upload/upload.component';

const routes: Routes = [
  // canActivate: mapToCanActivate([UserAuthGuard]),
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'channels',
        loadChildren: () => import('./pages/channels/channels.module').then((m) => m.ChannelModule),
      },
      {
        path: 'video/:id',
        loadChildren: () => import('./pages/video/video.module').then((m) => m.VideoModule),
      },
      {
        path: 'upload-video',
        component: UploadVideoComponent
      },
      {
        path: 'upload',
        component: UploadComponent
      },
      {
        path: 'history-page',
        component: HistoryPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
