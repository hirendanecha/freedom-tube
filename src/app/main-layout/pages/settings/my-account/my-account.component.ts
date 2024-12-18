import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { CommonService } from 'src/app/@shared/services/common.service';
import { ShareService } from 'src/app/@shared/services/share.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent {
  userData: any;
  videoList: any = [];
  channelDetails: any = {};
  apiUrl = environment.apiUrl + 'channels';
  channelData: any = [];
  channelList: any = [];
  activePage = 0;
  channelId: number;
  countChannel: number;
  hasMoreData = false;
  postedVideoCount: number;
  userChannelCount: number;
  constructor(
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    public shareService: ShareService
  ) {
    this.channelId = +localStorage.getItem('channelId');
    this.authService.loggedInUser$.subscribe((data) => {
      this.userData = data;
    });
  }

  ngOnInit(): void {
    // console.log("h",this.channelData);
    this.getChannels();
    this.getPostVideosById();
    this.getChannelByUserId();
  }

  getPostVideosById(): void {
    // this.commonService
    //   .post(`${this.apiUrl}/posts`, {
    //     id: this.channelDetails?.profileid,
    //     size: 10,
    //     page: 1,
    //   })
    //   .subscribe({
    //     next: (res: any) => {
    //       this.videoList = res.data;
    //       // console.log(res);
    //       console.log(this.videoList);

    //     },
    //     error: (error) => {
    //       console.log(error);
    //     },
    //   });
    this.activePage = 0;
    if (this.channelId) {
      this.loadMore();
    }
  }

  loadMore() {
    this.activePage++;
    this.spinner.show();
    this.commonService
      .post(`${this.apiUrl}/my-posts`, {
        id: this.channelId,
        size: 12,
        page: this.activePage,
      })
      .subscribe({
        next: (res: any) => {
          this.spinner.hide();
          if (res?.data?.length > 0) {
            this.videoList = this.videoList.concat(res.data);
            this.hasMoreData = false;
            this.postedVideoCount = res.pagination.totalItems;
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

  getChannelByUserId(): void {
    const url = environment.apiUrl;
    this.commonService
      .get(`${url}channels/my-channel/${this.userData.UserID}`)
      .subscribe({
        next: (res) => {
          if (res) {
            this.channelData = res;
            this.userChannelCount = this.channelData.length;
            console.log(this.channelData.length);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  getChannels(): void {
    const userId = this.userData?.UserID;
    const apiUrl = `${environment.apiUrl}channels/get-channels/${userId}`;
    this.commonService.get(apiUrl).subscribe({
      next: (res) => {
        if (res) {
          this.channelList = res.data;
          this.countChannel = this.channelList.length;
          let channelIds = this.channelList.map((e) => e.id);
          localStorage.setItem('get-channels', JSON.stringify(channelIds));
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
