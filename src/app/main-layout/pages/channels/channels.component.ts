import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
    private authService: AuthService,
    private router: Router
  ) { 
    this.userData = JSON.parse(this.authService.getUserData() as any);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngAfterViewInit(): void {
    // this.userData = this.authService.userDetails;
    // console.log('user', this.userData);
    this.getMyChannels();
  }

  getMyChannels(): void {
    this.commonService.getById(
      this.apiUrl,
      {
        id: this.userData.Id
      }
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.channelList = res.data;
      }, error: (error) => {
        console.log(error);
      }
    })
  }
}
