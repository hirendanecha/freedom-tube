import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  isSidebarOpen: boolean = true;
  isDarkTheme: boolean = false;

  constructor(
  ) {
    const theme = localStorage.getItem('theme');
    this.isDarkTheme = !(theme === 'dark');
    this.toggleTheme();

    const sidebar = localStorage.getItem('sidebar');
    this.isSidebarOpen = (sidebar === 'open');
  }

  openSidebar(): void {
    this.isSidebarOpen = true;
    localStorage.setItem('sidebar', 'open');
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
    localStorage.setItem('sidebar', 'close');
  }

  toggleSidebar(): void {
    if (this.isSidebarOpen) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }

  toggleTheme(): void {
    if (this.isDarkTheme) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      this.isDarkTheme = false;
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      this.isDarkTheme = true;
    }
  }

  scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
