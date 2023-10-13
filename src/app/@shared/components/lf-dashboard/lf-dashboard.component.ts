import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { environment } from 'src/environments/environment';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

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
  apiUrl = environment.apiUrl + 'customers/search-user';

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      // https://facetime.opash.in/
      const name = paramMap.get('name');
      if (name) {
        this.channelName = name;
      }
    });
  }

  ngOnInit(): void {}

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
}
