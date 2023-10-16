import { Component, HostListener } from '@angular/core';
import { ShareService } from './@shared/services/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isShowScrollTopBtn: boolean = false;

  constructor(
    public shareService: ShareService,
    ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 100) {
      this.isShowScrollTopBtn = true;
    } else {
      this.isShowScrollTopBtn = false;
    }
  }
}
