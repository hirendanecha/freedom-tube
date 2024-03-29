import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/@shared/services/toast.service';
import { CommonService } from 'src/app/@shared/services/common.service';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { ShareService } from 'src/app/@shared/services/share.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationsComponent {
  notificationList: any[] = [];

  constructor(
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastService: ToastService,
    private shareService: ShareService
  ) {}

  ngOnInit(): void {
    this.getNotificationList();
  }

  getNotificationList() {
    this.spinner.show();
    const id = this.shareService.userDetails.Id;
    this.commonService.getNotificationList(Number(id)).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        this.notificationList = res?.data;
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }

  viewUserPost(id) {
    this.router.navigate([`post/${id}`]);
  }

  removeNotification(id: number): void {
    this.commonService.deleteNotification(id).subscribe({
      next: (res: any) => {
        this.toastService.success(
          res.message || 'Notification delete successfully'
        );
        this.getNotificationList();
      },
    });
  }

  readUnreadNotification(id, isRead): void {
    this.commonService.readUnreadNotification(id, isRead).subscribe({
      next: (res) => {
        this.toastService.success(res.message);
        this.getNotificationList();
      },
    });
  }
}
