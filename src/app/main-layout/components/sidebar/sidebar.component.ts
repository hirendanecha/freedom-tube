import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareService } from 'src/app/@shared/services/share.service';
import { environment } from "../../../../environments/environment";
import { CommonService } from 'src/app/@shared/services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  channel: any;

  featuredChannels = [
    {
      id: 1,
      logo: 's1.png',
      name: 'Channel 1'
    },
    {
      id: 2,
      logo: 's1.png',
      name: 'Channel 2'
    },
    {
      id: 3,
      logo: 's1.png',
      name: 'Channel 3'
    },
    {
      id: 4,
      logo: 's1.png',
      name: 'Channel 4'
    },
    {
      id: 5,
      logo: 's1.png',
      name: 'Channel 5'
    },
    {
      id: 6,
      logo: 's1.png',
      name: 'Channel 6'
    },
    {
      id: 7,
      logo: 's1.png',
      name: 'Channel 7'
    },
    {
      id: 8,
      logo: 's1.png',
      name: 'Channel 8'
    },
    {
      id: 9,
      logo: 's1.png',
      name: 'Channel 9'
    },
    {
      id: 10,
      logo: 's1.png',
      name: 'Channel 10'
    },
    {
      id: 11,
      logo: 's1.png',
      name: 'Channel 11'
    },
    {
      id: 12,
      logo: 's1.png',
      name: 'Channel 12'
    },
    {
      id: 13,
      logo: 's1.png',
      name: 'Channel 13'
    },
    {
      id: 14,
      logo: 's1.png',
      name: 'Channel 14'
    },
    {
      id: 15,
      logo: 's1.png',
      name: 'Channel 15'
    }
  ];

  apiUrl = environment.apiUrl + 'channels/'



  constructor(
    public shareService: ShareService,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    const channelId = this.route.snapshot.paramMap.get('id');
    this.getChannels();
    // this.channel = this.channelService.getChannelById(channelId);
  }

  getChannels(): void {
    this.commonService.get(this.apiUrl).subscribe({
      next: ((res: any) => {
        console.log(res);
      }),
      error: (error) => {
        console.log(error);
      }
    })
  }
}
