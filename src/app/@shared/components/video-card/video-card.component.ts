import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnInit {
  videoData = [
    {
      id: 1,
      postdescription: 'There are many variations of passages of Lorem passages of Lorem passages of Lorem',
      albumname: 'Education',
      thumbfilename: 'v2.png',
      videoduration: '3:50',
      posttype: 'V',
      postcreationdate: '2020-02-17 09:56:52',
      profileid: 0,
      likescount: 0,
      dislikecount: 0,
      streamname: '',
      viewcount: '1.8M views',
    },
    {
      id: 2,
      postdescription: 'There are many variations of passages of Lorem passages of Lorem passages of Lorem',
      albumname: 'Tech',
      thumbfilename: 'v2.png',
      videoduration: '3:50',
      posttype: 'V',
      postcreationdate: '2020-02-17 09:56:52',
      profileid: 0,
      likescount: 0,
      dislikecount: 0,
      streamname: '',
      viewcount: '1.8M views',
    },
    {
      id: 3,
      postdescription: 'There are many variations of passages of Lorem passages of Lorem passages of Lorem',
      albumname: 'Education',
      thumbfilename: 'v2.png',
      videoduration: '3:50',
      posttype: 'V',
      postcreationdate: '2020-02-17 09:56:52',
      profileid: 0,
      likescount: 0,
      dislikecount: 0,
      streamname: '',
      viewcount: '1.8M views',
    },
    {
      id: 4,
      postdescription: 'There are many variations of passages of Lorem passages of Lorem passages of Lorem',
      albumname: 'Education',
      thumbfilename: 'v2.png',
      videoduration: '3:50',
      posttype: 'V',
      postcreationdate: '2020-02-17 09:56:52',
      profileid: 0,
      likescount: 0,
      dislikecount: 0,
      streamname: '',
      viewcount: '1.8M views',
    },
    {
      id: 5,
      postdescription: 'There are many variations of passages of Lorem passages of Lorem passages of Lorem',
      albumname: 'Education',
      thumbfilename: 'v2.png',
      videoduration: '3:50',
      posttype: 'V',
      postcreationdate: '2020-02-17 09:56:52',
      profileid: 0,
      likescount: 0,
      dislikecount: 0,
      streamname: '',
      viewcount: '1.8M views',
    },

  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openDetailPage(id: number):void{
    this.router.navigate([`video/${id}`])
  }
}
