import { NgModule } from '@angular/core';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UploadVideoComponent } from './pages/upload-video/upload-video.component';
import { SharedModule } from '../@shared/shared.module';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { UploadComponent } from './pages/upload/upload.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    UploadVideoComponent,
    MobileMenuComponent,
    HistoryPageComponent,
    UploadComponent
  ],
  imports: [
    MainLayoutRoutingModule,
    SharedModule,
  ]
})
export class MainLayoutModule { }
