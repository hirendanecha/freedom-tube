import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-slider-list',
  templateUrl: './video-slider-list.component.html',
  styleUrls: ['./video-slider-list.component.scss']
})
export class VideoSliderListComponent {
  // @Input() imageUrl!: string;
  // @Input() videoTime!: string;
  // @Input() videoTitle!: string;
  // @Input() views!: string;
  @Input() videoList: any;
  constructor(
    private router: Router
  ) {

  }

  openDetailPage(video: any): void {
    console.log(video.id);
    this.router.navigate([`video/${video.id}`], {
      state: { data: video }
    })
  }
}
