import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/@shared/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  apiUrl = environment.apiUrl + 'channels/posts';
  channelData: any = {};
  videoList: any = [];
  isNavigationEnd = false;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      const name = paramMap.get('name');
      if (name) {
        this.channelData = history.state.data;
      }
      this.getPostVideosById();
    });
  }

  ngOnInit() { }

  getPostVideosById(): void {
    this.commonService.post(this.apiUrl, { id: this.channelData?.profileid, size: 10, page: 1 }).subscribe({
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
