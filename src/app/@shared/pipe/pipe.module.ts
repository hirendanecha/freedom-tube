import { NgModule } from "@angular/core";
import { SafePipe } from "./safe.pipe";
import { GetImageUrlPipe } from "./get-image-url.pipe";
import { CommaSeperatePipe } from './comma-seperate.pipe';
import { TimeDurationPipe, timeDurationWithSec } from './time-duration.pipe';
import { DateDayPipe } from './date-day.pipe';

@NgModule({
  declarations: [SafePipe, GetImageUrlPipe, CommaSeperatePipe, TimeDurationPipe, timeDurationWithSec, DateDayPipe],
  imports: [],
  exports: [SafePipe, GetImageUrlPipe, CommaSeperatePipe, TimeDurationPipe, timeDurationWithSec, DateDayPipe],
})
export class PipeModule {}
