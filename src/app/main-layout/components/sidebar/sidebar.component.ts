import { Component } from '@angular/core';
import { ShareService } from 'src/app/@shared/services/share.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
    public shareService: ShareService,
  ) {}
}
