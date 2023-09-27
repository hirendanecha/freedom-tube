import { Component } from '@angular/core';
import { ShareService } from '../@shared/services/share.service';
import { BreakpointService } from '../@shared/services/breakpoint.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  constructor(
    public shareService: ShareService,
    public breakpointService: BreakpointService,
  ) {}
}
