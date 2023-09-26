import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  isOpenSidebar: boolean = false;

  constructor() { }

  openSidebar(): void {
    this.isOpenSidebar = true;
  }

  closeSidebar(): void {
    this.isOpenSidebar = false;
  }

  toggleSidebar(): void {
    this.isOpenSidebar = !this.isOpenSidebar;
  }

  scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
