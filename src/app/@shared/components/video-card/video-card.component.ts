import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var Clappr: any;

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnInit, AfterViewInit {

  @Input() videoData: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('videoData', this.videoData);

  }

  ngAfterViewInit(): void {
  }

  playvideo(video: any): void {
    let player = new Clappr.Player({
      source: 'https://s3-us-west-1.amazonaws.com/freedom-social/' + video.streamname,
      parentId: '#video-' + video.id,
      height: '220px',
      width: '388px',
      events: {
        onError: function (e: any) {
          console.log(e);

        }
      }
    })
  }

  openDetailPage(video: any): void {
    this.router.navigate([`video/${video.id}`], {
      state: { data: video }
    })
  }
}
