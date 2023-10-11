import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var Clappr: any;
declare var jwplayer: any;

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnInit, AfterViewInit {
  isPlay = false;
  postId!: number | null;

  @Input('videoData') videoData: any = [];
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  playvideo(video: any): void {
    this.isPlay = false;
    const player = jwplayer('jwVideo-' + video.id);
    player.setup({
      file: video.streamname,
      image: video?.thumbfilename,
      mute: true,
      autostart: false,
      volume: 30,
      height: '220px',
      width: '390px',
      playbackRateControls: false,
      preload: "metadata",
    });
    player.load();
    this.playVideoByID(video.id);
  }

  openDetailPage(video: any): void {
    this.router.navigate([`video/${video.id}`], {
      state: { data: video },
    });
  }

  playVideoByID(id: number) {
    this.postId = this.isPlay ? null : id;
    this.isPlay = !this.isPlay;
    console.log('isPlay', this.isPlay);
    console.log('postId', this.postId);
  }
}
