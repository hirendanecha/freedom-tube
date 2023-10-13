import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDay'
})
export class DateDayPipe implements PipeTransform {

  transform(value: string): string {
    const currentDate = new Date();
    const diffInTime = currentDate.getTime() - new Date(value).getTime();
    const diffInMinutes = Math.floor(diffInTime / (1000 * 60));
    const diffInSeconds = Math.floor(diffInTime / 1000);
    const diffInHours = Math.floor(diffInTime / (1000 * 3600));
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    }
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    }

    if (diffInDays === 0 && diffInMinutes >= 60) {
      return `${diffInHours}h`;
    }
    
    if (diffInDays === 1) {
      return '1d';  
    }

    return `${diffInDays}d`;
  }
}