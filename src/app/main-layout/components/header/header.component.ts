import { Component } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointService } from 'src/app/@shared/services/breakpoint.service';
import { ShareService } from 'src/app/@shared/services/share.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public shareService: ShareService,
    private breakpointService: BreakpointService,
    private offcanvasService: NgbOffcanvas
  ) {}

  toggleSidebar(): void {
    if (this.breakpointService.screen.getValue().md.gatherThen) {
      this.shareService.toggleSidebar();
    } else {
      this.offcanvasService.open(SidebarComponent);
    }
  }
}
