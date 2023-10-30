import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ShareService } from 'src/app/@shared/services/share.service';
import { CommonService } from 'src/app/@shared/services/common.service';

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  styleUrls: ['./notifications-modal.component.scss']
})
export class NotificationsModalComponent {

  constructor(
    public sharedService: ShareService,
    private commonService: CommonService,
    private activeModal: NgbActiveModal,
    private activeOffcanvas: NgbActiveOffcanvas,
    private router: Router,
  ) {
    this.sharedService.getNotificationList();
  }

  readUnreadNotification(postId: string, notificationId: number): void {
    this.commonService.readUnreadNotification(notificationId, 'Y').subscribe({
      next: (res) => {
        this.router.navigate([`post/${postId}`]);
        this.closeModal();
      },
    });
  }

  closeModal(): void {
    this.activeModal?.dismiss();
    this.activeOffcanvas?.dismiss();
  }
}
