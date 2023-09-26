import { Component } from '@angular/core';
import { ShareService } from 'src/app/@shared/services/share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public shareService: ShareService,
  ) {}
}
