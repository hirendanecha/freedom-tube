import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/@shared/services/common.service';
import { environment } from 'src/environments/environment';
declare var Clappr: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videoDetails: any = {}
  channelDetails: any = {}
  apiUrl = environment.apiUrl + 'channels';
  videoList: any = []
  constructor(
    private commonService: CommonService,
    private router: Router
  ) {
    this.router.events.subscribe((event: any) => {
      const id = event?.routerEvent?.url.split('/')[1];
      if (id) {
        this.videoDetails = history.state.data;
      }
    });
    console.log(this.videoDetails)
  }

  ngOnInit(): void {
    this.getMyChannels();
  }

  getMyChannels(): void {
    this.commonService.getById(
      this.apiUrl,
      { id: 62446 }
      // this.userData.profileId
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.channelDetails = res[0];
        this.getPostVideosById()
      }, error: (error) => {
        console.log(error);
      }
    })
  }

  getPostVideosById(): void {
    this.commonService.post(`${this.apiUrl}/posts`, { size: 10, page: 1 }).subscribe({
      next: (res: any) => {
        this.videoList = res.data
        console.log(res);
        this.playvideo();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  playvideo(): void {
    let player = new Clappr.Player({
      source: 'https://s3-us-west-1.amazonaws.com/freedom-social/' + this.videoDetails.streamname,
      parentId: '#video-' + this.videoDetails.id,
      height: '500px',
      width: 'auto',
      events: {
        onError: function (e: any) {
          console.log(e);

        }
      }
    })
  }
}
