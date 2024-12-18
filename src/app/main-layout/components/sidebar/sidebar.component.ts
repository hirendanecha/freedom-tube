import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ShareService } from 'src/app/@shared/services/share.service';
import { environment } from '../../../../environments/environment';
import { CommonService } from 'src/app/@shared/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { BreakpointService } from 'src/app/@shared/services/breakpoint.service';
import { FEATURED_CHANNEL_ORDER } from 'src/app/@shared/constant/featureChannelOrder';
import { ChannelApplicationModalComponent } from 'src/app/@shared/modals/channel-application-modal/channel-application-modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  channel: any;
  featuredChannels: any;
  useDetails: any = {};

  apiUrl = environment.apiUrl + 'channels/';

  constructor(
    public shareService: ShareService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public authService: AuthService,
    public breakpointService: BreakpointService,
    private offcanvasService: NgbOffcanvas,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const channelId = this.route.snapshot.paramMap.get('id');
    this.getChannels();
    // this.channel = this.channelService.getChannelById(channelId);
  }

  getChannels(): void {
    // this.spinner.show();
    this.commonService.get(this.apiUrl).subscribe({
      next: (res: any) => {
        // this.spinner.hide();
        if (res.data) {
          // this.featuredChannels = res.data;
          this.featuredChannels = res.data
            .filter((item: any) => item.feature === 'Y')
            .sort((a, b) => {
              const indexA = FEATURED_CHANNEL_ORDER.indexOf(a.firstname);
              const indexB = FEATURED_CHANNEL_ORDER.indexOf(b.firstname);
              return (
                (indexA === -1 ? Infinity : indexA) -
                (indexB === -1 ? Infinity : indexB)
              );
            });
        }
      },
      error: (error) => {
        // this.spinner.hide();
        console.log(error);
      },
    });
  }

  navigateToChannel(channel: any) {
    // console.log(channel);
    // this.router.navigate([`home/${channel?.unique_link}`, { data: channel }]);

    // this.router.navigate([`channel/${channel?.unique_link}`], {
    //   state: { data: channel },
    // });
    this.offcanvasService.dismiss();
  }

  isUserMediaApproved(): boolean {
    return this.useDetails?.MediaApproved === 1;
  }

  openApplicationForm(): void {
    const modalRef = this.modalService.open(ChannelApplicationModalComponent, {
      centered: true,
      size: 'lg',
    });
  }
}
