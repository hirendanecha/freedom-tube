import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { BtnLoaderDirective } from './directives/btn-loader.directive';

const sharedComponents = [
  BtnLoaderDirective
];

const sharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgxTrimDirectiveModule,
];

@NgModule({
  declarations: sharedComponents,
  imports: sharedModules,
  exports: [...sharedModules, ...sharedComponents],
})
export class SharedModule { }
