import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { CommonService } from 'src/app/@shared/services/common.service';
import { SocketService } from 'src/app/@shared/services/socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  apiUrl = environment.apiUrl + 'channels/';
  channelData: any = {};
  videoList: any = [];
  recommendedVideoList: any = [];
  isNavigationEnd = false;
  activePage!: number;
  activeFeturePage: number;
  hasMoreData = false;
  hasRecommendedData = false;
  channelName = '';
  profileId: number

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private socketService: SocketService,
    private authService: AuthService
  ) {
    this.profileId = JSON.parse(this.authService.getUserData() as any)?.Id
    this.route.paramMap.subscribe((paramMap) => {
      // https://facetime.opash.in/
      const name = paramMap.get('name');
      this.channelName = name;
      this.videoList = [];
      if (name) {
          this.channelName = name;
          this.getChannelDetails(name);
          } else{
        this.getChannelDetails(this.profileId);
                } 
            this.getPostVideosById();
    });
  }

  ngOnInit() {
    this.loadMore();
  }

  ngAfterViewInit(): void {
    if (!this.socketService.socket.connected) {
      this.socketService.socket.connect();
    }
  }

  getChannelDetails(value): void {
    this.commonService.get(`${this.apiUrl}${value}`).subscribe({
      next: (res) => {
        console.log(res.data);
        if (res.data.length) {
          this.channelData = res.data[0]
          console.log(this.channelData);
          
        }
      }, error: (error) => {
        console.log(error)
      }
    })
  }

  // getPostVideosById(): void {
  //   this.commonService
  //     .post(this.apiUrl, { id: this.channelData?.profileid, size: 10, page: this.activePage })
  //     .subscribe({
  //       next: (res: any) => {
  //         this.videoList = res.data;
  //         console.log(res);
  //       },
  //       error: (error) => {
  //         console.log(error);
  //       },
  //     });
  // }

  getPostVideosById(): void {
    this.activePage = 0;
    this.activeFeturePage = 0;
    if (this.channelData.profileid) {
      this.loadMore();
    }
    this.recommendedLoadMore();
  }

  loadMore() {
    this.activePage++;
    this.spinner.show();
    this.commonService
      .post(`${this.apiUrl}posts`, {
        id: this.channelData?.profileid,
        size: 12,
        page: this.activePage,
      })
      .subscribe({
        next: (res: any) => {
          this.spinner.hide();
          if (res?.data?.length > 0) {
            this.videoList = this.videoList.concat(res.data);
            this.hasMoreData = false;
          } else {
            this.hasMoreData = true;
          }
        },
        error: (error) => {
          this.spinner.hide();
          console.log(error);
        },
      });
  }

  recommendedLoadMore() {
    this.activeFeturePage++;
    this.spinner.show();
    this.commonService
      .post(`${this.apiUrl}posts`, {
        size: 12,
        page: this.activeFeturePage,
      })
      .subscribe({
        next: (res: any) => {
          this.spinner.hide();
          if (res?.data?.length > 0) {
            this.recommendedVideoList = this.recommendedVideoList.concat(res.data);
            this.hasRecommendedData = false;
          } else {
            this.hasRecommendedData = true;
          }
        },
        error: (error) => {
          this.spinner.hide();
          console.log(error);
        },
      });
  }
}
