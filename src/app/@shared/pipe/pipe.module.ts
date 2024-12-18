import { NgModule } from "@angular/core";
import { SafePipe } from "./safe.pipe";
import { GetImageUrlPipe } from "./get-image-url.pipe";
import { CommaSeperatePipe } from './comma-seperate.pipe';
import { TimeDurationPipe, timeDurationWithSec } from './time-duration.pipe';
import { DateDayPipe } from './date-day.pipe';
import { NoSanitizePipe } from "./sanitize.pipe";
import { RandomAdvertisementUrlPipe } from "./random-advertisement.pipe";
import { StripHtmlPipe, TruncatePipe } from "./post-description.pipe";

@NgModule({
  declarations: [SafePipe, GetImageUrlPipe, CommaSeperatePipe, TimeDurationPipe, timeDurationWithSec, DateDayPipe, NoSanitizePipe, RandomAdvertisementUrlPipe, StripHtmlPipe, TruncatePipe],
  imports: [],
  exports: [SafePipe, GetImageUrlPipe, CommaSeperatePipe, TimeDurationPipe, timeDurationWithSec, DateDayPipe, NoSanitizePipe, RandomAdvertisementUrlPipe, StripHtmlPipe, TruncatePipe],
})
export class PipeModule { }
