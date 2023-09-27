import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { ChannelsComponent } from './pages/channels/channels.component';
import { SingleChannelComponent } from './pages/single-channel/single-channel.component';
import { VideoComponent } from './pages/video/video.component';
import { UploadVideoComponent } from './pages/upload-video/upload-video.component';
import { SharedModule } from '../@shared/shared.module';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    ChannelsComponent,
    SingleChannelComponent,
    VideoComponent,
    UploadVideoComponent
  ],
  imports: [
    MainLayoutRoutingModule,
    SharedModule,
  ]
})
export class MainLayoutModule { }
