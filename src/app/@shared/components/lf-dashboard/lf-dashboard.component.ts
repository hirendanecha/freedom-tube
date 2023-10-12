import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lf-dashboard',
  templateUrl: './lf-dashboard.component.html',
  styleUrls: ['./lf-dashboard.component.scss'],
})
export class LfDashboardComponent implements OnInit {
  channelName = ''
  constructor(
    private route: ActivatedRoute
  ) {
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
    const webRtcUrl = `https://facetime.opash.in/${this.channelName}`
    window.open(webRtcUrl, '_blank');
  }
}
