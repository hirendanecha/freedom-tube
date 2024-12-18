import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { CommonService } from 'src/app/@shared/services/common.service';
import { SeoService } from 'src/app/@shared/services/seo.service';
import { ShareService } from 'src/app/@shared/services/share.service';
import { SocketService } from 'src/app/@shared/services/socket.service';
import { ToastService } from 'src/app/@shared/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  apiUrl = environment.apiUrl + 'channels/';
  channelData: any = {};
  videoList: any = [];
  recommendedVideoList: any = [];
  isNavigationEnd = false;
  activePage = 0;
  activeFeturePage = 0;
  hasMoreData = false;
  isRecommendedLoading = false;
  isLoading = false;
  hasRecommendedData = false;
  channelName = '';
  profileId: number;
  userId: number;
  channelId: number;
  receivedSearchText: string = '';
  activeTab: string = 'Videos';
  searchChannelData: any = [];
  searchPostData: any = [];
  searchResults: number;

  notificationId: number;
  searchText: string;
  advertisementDataList: any = [];
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private socketService: SocketService,
    private authService: AuthService,
    private shareService: ShareService,
    private seoService: SeoService,
    private toastService: ToastService,
  ) {
    this.authService.loggedInUser$.subscribe((data) => {
      this.userData = data;
      this.profileId = this.userData?.profileId;
      this.userId = this.userData?.UserID;
    });
    this.channelId = +localStorage.getItem('channelId');

    this.route.paramMap.subscribe((paramMap) => {
      // https://facetime.opash.in/
      const name = paramMap.get('name');
      this.channelName = name;
      this.videoList = [];
      if (name) {
        this.channelName = name;
        this.getChannelDetails(name);
        if (this.searchResults) {
          this.searchChannelData = null;
          this.searchPostData = null;
          this.searchResults = null;
        }
      }
      // else if (this.userId) {
      //   this.getChannelByUserId(this.userId);
      // }
    });
    const data = {
      title: `FreedomTube`,
      description: '',
    };
    this.seoService.updateSeoMetaData(data);
  }

  ngOnInit() {
    if (!this.channelName) {
      this.recommendedLoadMore();
    }
    this.getadvertizements();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const thresholdFraction = 0.2;
    const threshold = windowHeight * thresholdFraction;

    if (scrollY + windowHeight >= documentHeight - threshold) {
      if (!this.isRecommendedLoading && !this.hasRecommendedData && !this.channelName) {
        this.recommendedLoadMore();
      }
      if (!this.isLoading && !this.hasMoreData && this.channelData?.id) {
        this.loadMore();
      }
    }
  }

  ngAfterViewInit(): void {
    if (!this.socketService?.socket?.connected) {
      this.socketService?.socket?.connect();
    }

    this.socketService?.socket?.emit('join', { room: this.profileId });
    this.socketService?.socket?.on('notification', (data: any) => {
      console.log(data);
      if (data) {
        if (data.actionType === 'S') {
          this.toastService.danger(data?.notificationDesc);
          this.authService.logOut();
        }
        this.notificationId = data.id;
        if (data?.notificationByProfileId !== this.profileId) {
          this.shareService.setNotify(true);
        };
        if (this.notificationId) {
          this.commonService.getNotification(this.notificationId).subscribe({
            next: (res) => {
              // console.log(res);
              // localStorage.setItem('isRead', res.data[0]?.isRead);
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
      }
    });
    this.socketService?.socket?.on('logout-check', (res) => {
      if (
        res.profileId === this.profileId &&
        res.token === this.authService.getToken()
      ) {
        localStorage.clear();
        sessionStorage.clear();
        this.shareService.updateMediaApproved(false);
      }
    });
  }

  getChannelByUserId(value): void {
    this.commonService.get(`${this.apiUrl}my-channel/${value}`).subscribe({
      next: (res) => {
        // console.log(res.data);
        if (res) {
          this.channelData = res[0];
          // localStorage.setItem('channelId', this.channelData.id);
          // console.log(this.channelData);
          const data = {
            title: `Freedom.Tube ${
              this.channelData?.firstname ? this.channelData.firstname : ''
            }`,
            url: `${location.href}`,
            description: '',
          };
          this.seoService.updateSeoMetaData(data);
          this.getPostVideosById();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getChannelDetails(value): void {
    this.isLoading = true;
    this.commonService.get(`${this.apiUrl}${value}`).subscribe({
      next: (res) => {
        // console.log(res.data);
        this.isLoading = false;
        if (res.data.length) {
          this.channelData = res.data[0];
          const data = {
            title: `Freedom.Tube ${
              this.channelData?.firstname ? this.channelData.firstname : ''
            }`,
            url: `${location.href}`,
            description: '',
          };
          this.seoService.updateSeoMetaData(data);
          // console.log(this.channelData);
          this.getPostVideosById();
        }
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
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
    if (this.channelData?.id) {
      this.loadMore();
    }
  }

  loadMore() {
    this.isLoading = true;
    this.activePage++;
    this.spinner.show();
    this.commonService
      .post(`${this.apiUrl}my-posts`, {
        id: this.channelData?.id,
        size: 12,
        page: this.activePage,
      })
      .subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.isLoading = false;
          if (res?.data?.length > 0) {
            this.videoList = this.videoList.concat(res.data);
            this.hasMoreData = false;
          } else {
            this.hasMoreData = true;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.spinner.hide();
          console.log(error);
        },
      });
  }

  recommendedLoadMore() {
    this.activeFeturePage++;
    this.spinner.show();
    this.isRecommendedLoading = true;
    this.commonService
      .post(`${this.apiUrl}posts`, {
        id: this.channelData?.id,
        size: 12,
        page: this.activeFeturePage,
      })
      .subscribe({
        next: (res: any) => {
          this.isRecommendedLoading = false;
          this.spinner.hide();
          if (res?.data?.length > 0) {
            this.recommendedVideoList = this.recommendedVideoList.concat(
              res.data
            );
            this.hasRecommendedData = false;
          } else {
            this.hasRecommendedData = true;
          }
        },
        error: (error) => {
          this.isRecommendedLoading = false;
          this.spinner.hide();
          console.log(error);
        },
      });
  }
  switchTab(tabName: string) {
    this.activeTab = tabName;
    console.log(tabName);
  }

  onSearchData(searchText: string) {
    console.log(searchText);
    this.searchText = searchText;

    this.spinner.show();
    this.commonService
      .post(`${this.apiUrl}search-all`, { search: searchText })
      .subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.searchChannelData = res.channels;
          this.searchPostData = res.posts;
          this.searchResults =
            this.searchChannelData.length + this.searchPostData.length;
          if (res.channels.length === 0) {
            this.activeTab = 'Videos';
          }
          // console.log(this.searchResults);
        },
        error: (error) => {
          this.spinner.hide();
          console.log(error);
        },
      });
  }

  clearSearchData() {
    this.searchChannelData = null;
    this.searchPostData = null;
    this.searchResults = null;
  }

  getadvertizements(): void {
    this.commonService.getAdvertisement().subscribe({
      next: (res: any) => {
        this.advertisementDataList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
