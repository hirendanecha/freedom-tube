import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { BtnLoaderDirective } from './directives/btn-loader.directive';
import { NgbDropdownModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAngleDoubleUp, faXmark, faBars, faChevronDown, faChevronUp, faChevronRight, faUser, faUsers, faBell, faHouse, faGear, faSun, faMoon, faPlus, faVideo, faCloudUpload, faHistory, faCalendar, faPlayCircle, faUpload, faPlusSquare, faSearch, faPlusCircle, faUserCircle, faCog, faCheckCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { VideoCardComponent } from './components/video-card/video-card.component'
import { LfDashboardComponent } from './components/lf-dashboard/lf-dashboard.component';
import { ChannelsCardComponent } from './components/channels-card/channels-card.component';

const sharedComponents = [
  ConfirmationModalComponent,
  BtnLoaderDirective,
  VideoCardComponent,
  LfDashboardComponent,
  ChannelsCardComponent
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
      faVideo,
      faCog,
      faCheckCircle,
      faSignOutAlt
    );
  }
}
