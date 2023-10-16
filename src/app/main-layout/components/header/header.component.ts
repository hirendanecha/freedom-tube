import { Component } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointService } from 'src/app/@shared/services/breakpoint.service';
import { ShareService } from 'src/app/@shared/services/share.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonService } from 'src/app/@shared/services/common.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/@shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  useDetails: any = {};
  apiUrl = environment.apiUrl + 'customers/logout';
  
  constructor(
    public shareService: ShareService,
    private breakpointService: BreakpointService,
    private offcanvasService: NgbOffcanvas,
    private commonService: CommonService,
    private cookieService: CookieService,
    public authService: AuthService,
    private router: Router
  ) {
    this.useDetails = JSON.parse(this.authService.getUserData() as any);
  }
 

  toggleSidebar(): void {
    if (this.breakpointService.screen.getValue().md.gatherThen) {
      this.shareService.toggleSidebar();
    } else {
      this.offcanvasService.open(SidebarComponent);
    }
  }

  logout(): void {
    // this.isCollapsed = true;
    this.commonService.get(this.apiUrl).subscribe({
      next: (res => {
        this.cookieService.delete('auth-user');
        localStorage.clear();
        sessionStorage.clear();
        this.cookieService.deleteAll();
        location.href = "https://freedom.buzz/";
      })
    })
  }

  isUserMediaApproved(): boolean {
    return this.useDetails?.MediaApproved === 1;
  }
}
