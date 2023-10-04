import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnInit {

  @Input() videoData: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('videoData', this.videoData);
  }

  openDetailPage(id: number): void {
    this.router.navigate([`video/${id}`])
  }
}
