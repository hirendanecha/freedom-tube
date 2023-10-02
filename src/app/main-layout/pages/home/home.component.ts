import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/@shared/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  apiUrl = environment.apiUrl + 'channels';
  channelData: any = {};
  videoList: any = [];
  
  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe((params) => {
      const uniqueLink = params.get('name');
      this.channelData = history.state.data;
      this.getPostVideosById()

      console.log('channelData', this.channelData);
      
    });
  }

  getPostVideosById(): void {
    this.commonService.getById(this.apiUrl, { id: this.channelData?.profileid },{size: 10, page: 1}).subscribe({
      next: (res: any) => {
        this.videoList = res.data
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
