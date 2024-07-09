import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomAdvertisementUrl'
})
export class RandomAdvertisementUrlPipe implements PipeTransform {
  transform(advertisementDataList: any[], index: number): string {
    index = (index + 1) % advertisementDataList.length;
    if (advertisementDataList?.length > 0) {
      const adjustedIndex = (advertisementDataList.length - 1 - index) % advertisementDataList.length;
      return advertisementDataList[adjustedIndex].imageUrl;
    }
    return '/assets/images/avtar/placeholder-user.png';
  }
}
