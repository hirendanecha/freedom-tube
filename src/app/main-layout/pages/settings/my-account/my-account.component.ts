import { Component } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { CommonService } from 'src/app/@shared/services/common.service';
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
  channelList: any = [];
  constructor(
    private commonService: CommonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getPostVideosById();
  }

  ngAfterViewInit(): void {
    this.userData = this.authService.userDetails;
    console.log('user', this.userData);
    this.getMyChannels();
  }

  getPostVideosById(): void {
    this.commonService
      .post(`${this.apiUrl}channels/posts`, {
        id: this.channelDetails?.profileid,
        size: 10,
        page: 1,
      })
      .subscribe({
        next: (res: any) => {
          this.videoList = res.data;
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getMyChannels(): void {
    this.commonService
      .getById(this.apiUrl, { id: this.userData.profileId })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.channelList = res;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
