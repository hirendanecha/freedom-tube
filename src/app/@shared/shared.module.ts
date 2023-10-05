import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { BtnLoaderDirective } from './directives/btn-loader.directive';
import { NgbDropdownModule, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAngleDoubleUp, faXmark, faBars, faChevronDown, faChevronUp, faChevronRight, faUser, faUsers, faBell, faHouse, faGear, faSun, faMoon, faPlus, faVideo, faCloudUpload, faHistory, faCalendar, faPlayCircle, faUpload, faPlusSquare, faSearch, faPlusCircle, faUserCircle, faCog, faCheckCircle, faSignOutAlt, faEye, faClock, faFileUpload, faAngleRight, faCloudUploadAlt, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { VideoCardComponent } from './components/video-card/video-card.component'
import { LfDashboardComponent } from './components/lf-dashboard/lf-dashboard.component';
import { ChannelsCardComponent } from './components/channels-card/channels-card.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { PipeModule } from './pipe/pipe.module';
import { VideoSliderListComponent } from './components/video-slider-list/video-slider-list.component';
import { DetailsCardComponent } from './components/details-card/details-card.component';

const sharedComponents = [
  ConfirmationModalComponent,
  BtnLoaderDirective,
  VideoCardComponent,
  LfDashboardComponent,
  ChannelsCardComponent,
  VideoSliderListComponent,
  DetailsCardComponent
];

const sharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  NgxTrimDirectiveModule,
  NgbToastModule,
  NgbDropdownModule,
  FontAwesomeModule,
  NgxSpinnerModule,
  RouterModule,
  NgbModule,
  PipeModule
];

@NgModule({
  declarations: sharedComponents,
  imports: sharedModules,
  exports: [...sharedModules, ...sharedComponents],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faAngleDoubleUp,
      faXmark,
      faBars,
      faChevronDown,
      faChevronUp,
      faChevronRight,
      faUser,
      faUsers,
      faBell,
      faHouse,
      faGear,
      faSun,
      faMoon,
      faPlus,
      faVideo,
      faCloudUpload,
      faHistory,
      faCalendar,
      faPlayCircle,
      faUpload,
      faPlusSquare,
      faSearch,
      faPlusCircle,
      faUserCircle,
      faCog,
      faCheckCircle,
      faSignOutAlt,
      faEye,
      faClock,
      faFileUpload,
      faAngleRight,
      faCloudUploadAlt,
      faListAlt
    );
  }
}
