import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/@shared/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-channel',
  templateUrl: './single-channel.component.html',
  styleUrls: ['./single-channel.component.scss']
})
export class SingleChannelComponent implements OnInit {
  channelDetails: any = {}
  videoList: any = []
  apiUrl = environment.apiUrl
  activeTab = 1;
  constructor(
    private commonService: CommonService
  ) {
    this.channelDetails = history.state.data
  }

  ngOnInit(): void {
    this.getPostVideosById();
  }


  getPostVideosById(): void {
    this.commonService.post(`${this.apiUrl}channels/posts`, { id: this.channelDetails?.profileid, size: 10, page: 1 }).subscribe({
      next: (res: any) => {
        this.videoList = res.data
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
