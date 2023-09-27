import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './@shared/interceptors/header.interceptor';
import { ToastModalComponent } from './@shared/components/toast-modal/toast-modal.component';
import { SharedModule } from './@shared/shared.module';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    ToastModalComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi:true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
