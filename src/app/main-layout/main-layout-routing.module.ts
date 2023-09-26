import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ChannelsComponent } from './pages/channels/channels.component';
import { SingleChannelComponent } from './pages/single-channel/single-channel.component';
import { VideoComponent } from './pages/video/video.component';
import { UploadVideoComponent } from './pages/upload-video/upload-video.component';

const routes: Routes = [
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
        component: HomeComponent
      },
      {
        path: 'channels',
        component: ChannelsComponent
      },
      {
        path: 'single-channel',
        component: SingleChannelComponent
      },
      {
        path: 'video',
        component: VideoComponent
      },
      {
        path: 'upload-video',
        component: UploadVideoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
