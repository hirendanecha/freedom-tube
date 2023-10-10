import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/@shared/services/common.service';
import { SocketService } from 'src/app/@shared/services/socket.service';
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
  activePage!: number;
  hasMoreData = false;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private socketService: SocketService,
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      const name = paramMap.get('name');
      this.videoList = [];
      if (name) {
        this.channelData = history.state.data;
      }
      this.getPostVideosById();
    });
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    if (!this.socketService.socket.connected) {
      this.socketService.socket.connect();
    }
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
    this.loadMore();
  }

  loadMore() {
    this.activePage++;
    this.spinner.show();
    this.commonService
      .post(this.apiUrl, {
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
}
