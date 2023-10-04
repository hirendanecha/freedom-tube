import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { CommonService } from 'src/app/@shared/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit, AfterViewInit {
  userData: any
  apiUrl = environment.apiUrl + 'channels'
  channelList: any = []
  constructor(
    private commonService: CommonService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.userData = this.authService.userDetails;
    console.log('user', this.userData);
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
        this.channelList = res;
      }, error: (error) => {
        console.log(error);
      }
    })
  }
}
