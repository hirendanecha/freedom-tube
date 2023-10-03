import { Component, Input } from '@angular/core';

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
  // @Input() uploadedTime!: string;


  videos = [
    {
      imageUrl: '/assets/img/v1.png',
      videoTime: '3:50',
      videoTitle: 'VATSAL',
      views: '1.8M',
      uploadedTime: '11 Months ago'
    },
    {
      imageUrl: '/assets/img/v1.png',
      videoTime: '8:50',
      videoTitle: 'Here are many variations of passages of Lorem',
      views: '1.8M',
      uploadedTime: '11 Months ago'
    },
    // Add more video data objects as needed
  ];

}
