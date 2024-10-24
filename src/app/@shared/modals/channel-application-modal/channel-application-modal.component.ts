import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../services/toast.service';
import { ChannelService } from '../../services/channels.service';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';
import e from 'express';

@Component({
  selector: 'app-channel-application-modal',
  templateUrl: './channel-application-modal.component.html',
  styleUrls: ['./channel-application-modal.component.scss'],
})
export class ChannelApplicationModalComponent implements AfterViewInit {
  selectedFile: any;
  myProp: string;
  hasDisplayedError = false;
  profileId: number;
  originUrl = environment.conferenceUrl;
  link: string = '';
  pattern = '/(?:https?://|www.)[^s<&]+(?:.[^s<&]+)+(?:.[^s<]+)?/g';
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    channelName: new FormControl('', [Validators.required]),
    topics_covered: new FormControl('', [Validators.required]),
    bitChuteUrl: new FormControl('', Validators.pattern(this.pattern)),
    rumbleUrl: new FormControl('', Validators.pattern(this.pattern)),
    youtubeUrl: new FormControl('', Validators.pattern(this.pattern)),
    otherUrl: new FormControl('', Validators.pattern(this.pattern)),
  });
  constructor(
    private spinner: NgxSpinnerService,
    public toastService: ToastService,
    public activateModal: NgbActiveModal,
    private channelService: ChannelService,
    public authService: AuthService
  ) {}
  ngAfterViewInit(): void {
    this.authService.loggedInUser$.subscribe((data) => {
      this.profileId = data?.profileId;
      this.userForm.get('username').setValue(data?.Username);
      this.userForm.get('email').setValue(data?.Email);
    });
  }

  ngOnInit(): void {}

  slugify = (str: string) => {
    return str?.length > 0
      ? str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      : '';
  };

  resetForm(): void {
    this.userForm.reset();
  }

  saveChanges(): void {
    if (
      !(
        this.userForm.value.bitChuteUrl ||
        this.userForm.value.rumbleUrl ||
        this.userForm.value.youtubeUrl ||
        this.userForm.value.otherUrl
      )
    ) {
      this.toastService.danger('Please enter at least one url');
    } else if (!this.userForm.invalid) {
      this.channelService.createApplication(this.userForm.value).subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.activateModal.close('success');
          this.toastService.success(res.message);
        },
        error: (err) => {
          this.spinner.hide();
          console.log(err);
        },
      });
    } else {
      this.toastService.danger('Please enter valid details');
    }
  }
}
