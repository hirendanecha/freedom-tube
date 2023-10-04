import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { UploadVideoComponent } from './pages/upload-video/upload-video.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { UserAuthGuard } from '../@shared/guards/user-auth.guard';
import { UploadComponent } from './pages/upload/upload.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
        canActivate: mapToCanActivate([UserAuthGuard]),
      },
      {
        path: 'channels',
        loadChildren: () => import('./pages/channels/channels.module').then((m) => m.ChannelModule),
        canActivate: mapToCanActivate([UserAuthGuard]),

      },
      {
        path: 'video/:id',
        loadChildren: () => import('./pages/video/video.module').then((m) => m.VideoModule),
        canActivate: mapToCanActivate([UserAuthGuard]),

      },
      {
        path: 'upload-video',
        component: UploadVideoComponent,
        canActivate: mapToCanActivate([UserAuthGuard]),
      },
      {
        path: 'upload',
        component: UploadComponent
      },
      {
        path: 'history-page',
        component: HistoryPageComponent,
        canActivate: mapToCanActivate([UserAuthGuard]),

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
