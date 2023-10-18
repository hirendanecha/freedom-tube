import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { environment } from 'src/environments/environment';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { VideoPostModalComponent } from '../../modals/video-post-modal/video-post-modal.component';
import { CreateChannelComponent } from '../create-channel/create-channel.component';

@Component({
  selector: 'app-lf-dashboard',
  templateUrl: './lf-dashboard.component.html',
  styleUrls: ['./lf-dashboard.component.scss'],
})
export class LfDashboardComponent implements OnInit {
  @ViewChild('userSearchDropdownRef', { static: false, read: NgbDropdown })
  userSearchNgbDropdown: NgbDropdown;
  userList: any = [];
  channelName = '';
  searchText: string = '';
  useDetails: any = {};
  apiUrl = environment.apiUrl + 'customers/search-user';

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    public authService: AuthService,
    private modalService: NgbModal
  ) {
    this.useDetails = JSON.parse(this.authService.getUserData() as any);
    this.route.paramMap.subscribe((paramMap) => {
      // https://facetime.opash.in/
      const name = paramMap.get('name');
      if (name) {
        this.channelName = name;
      }
    });
  }

  ngOnInit(): void { }

  openWebRtc(): void {
    const webRtcUrl = `https://facetime.opash.in/${this.channelName}`;
    window.open(webRtcUrl, '_blank');
  }

  getSearchData(): void {
    this.commonService
      .get(`${this.apiUrl}?searchText=${this.searchText}`)
      .subscribe({
        next: (res: any) => {
          if (res?.data?.length > 0) {
            this.userList = res.data;
            this.userSearchNgbDropdown.open();
          } else {
            this.userList = [];
            this.userSearchNgbDropdown.close();
          }
        },
        error: (error) => {
          this.userList = [];
          this.userSearchNgbDropdown.close();
          console.log(error);
        },
      });
  }

  openProfile(Id): void {
    const url = `https://freedom.buzz/settings/view-profile/${Id}`;
    window.open(url, '_blank');
  }

  isUserMediaApproved(): boolean {
    return this.useDetails?.MediaApproved === 1;
  }

  openVideoUploadPopUp(): void {
    const modalRef = this.modalService.open(VideoPostModalComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.title = `Upload Video`;
    modalRef.componentInstance.confirmButtonLabel = 'Upload Video';
    modalRef.componentInstance.cancelButtonLabel = 'Cancel';
    modalRef.result.then(res => {
      console.log(res)
    })

  }

  createChannel():void{
    const modalRef = this.modalService.open(CreateChannelComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.title = `Create Channel`;
    modalRef.componentInstance.confirmButtonLabel = 'Save';
    modalRef.componentInstance.cancelButtonLabel = 'Cancel';
    modalRef.result.then((res) => {
      if (res === 'success') {
        // this.getChannels();
      }
    });
  }
}
