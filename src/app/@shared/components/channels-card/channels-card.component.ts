import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channels-card',
  templateUrl: './channels-card.component.html',
  styleUrls: ['./channels-card.component.scss'],
})
export class ChannelsCardComponent implements OnInit {
  
  channels = [
    {
      id: 1,
      name: 'Channel 1',
      subscribers: '382,323 subscribers',
      image: 's1.png',
      subscriptionCount: '1.4M',
    },
    {
      id: 2,
      name: 'Channel 2',
      subscribers: '125,678 subscribers',
      image: 's2.png',
      subscriptionCount: '920K',
    },
    {
      id: 3,
      name: 'Channel 3',
      subscribers: '760,987 subscribers',
      image: 's3.png',
      subscriptionCount: '3.2M',
    },
    {
      id: 4,
      name: 'Channel 4',
      subscribers: '1,234,567 subscribers',
      image: 's4.png',
      subscriptionCount: '5.8M',
    },
    {
      id: 5,
      name: 'Channel 5',
      subscribers: '523,412 subscribers',
      image: 's5.png',
      subscriptionCount: '2.1M',
    },
  ];
  
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  openChannelDetailPage(id: number):void{
    this.router.navigate([`channel/${id}`])
  }
}
