import { NgModule } from "@angular/core";
import { SafePipe } from "./safe.pipe";
import { GetImageUrlPipe } from "./get-image-url.pipe";
import { CommaSeperatePipe } from './comma-seperate.pipe';
import { TimeDurationPipe } from './time-duration.pipe';

@NgModule({
  declarations: [SafePipe, GetImageUrlPipe, CommaSeperatePipe, TimeDurationPipe],
  imports: [],
  exports: [SafePipe, GetImageUrlPipe, CommaSeperatePipe, TimeDurationPipe],
})
export class PipeModule {}
