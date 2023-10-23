import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { SocketService } from '../../services/socket.service';
import { CommonService } from '../../services/common.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-post-modal',
  templateUrl: './video-post-modal.component.html',
  styleUrls: ['./video-post-modal.component.scss'],
})
export class VideoPostModalComponent {
  @Input() cancelButtonLabel: string = 'Cancel';
  @Input() confirmButtonLabel: string = 'Confirm';
  @Input() title: string = 'Confirmation Dialog';
  @Input() message: string;
  @Input() data: any;
  @Input() communityId: any;
  postData: any = {
    profileid: null,
    communityId: null,
    postdescription: '',
    tags: [],
    imageUrl: '',
    videoduration: null,
    thumbfilename: null,
    streamname: null,
    posttype: 'V',
    albumname: '',
    file1: {},
    file2: {},
    keywords: ''
  };
  selectedVideoFile: any;
  selectedThumbFile: any;
  postMessageTags: any[];
  postMessageInputValue: string = '';
  apiUrl = environment.apiUrl + 'posts/create-post';
  isProgress = false;
  progressValue = 0;
  channelId = null
  constructor(
    public activeModal: NgbActiveModal,
    private toastService: ToastService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private authService: AuthService,
    private router: Router
  ) {
    this.postData.profileid = JSON.parse(
      this.authService.getUserData() as any
    )?.Id;
    console.log('profileId', this.postData.profileid);
    this.channelId = +localStorage.getItem('channelId');
    console.log(this.channelId);
  }

  uploadImgAndSubmit(): void {
    if (this.postData?.profileid && this.postData.postdescription &&
      this.postData.albumname && this.postData.file1 && this.postData.file2) {
      this.startProgress();
      this.isProgress = true;
      let uploadObs = {};
      if (this.postData?.file1?.name) {
        uploadObs['streamname'] = this.commonService.upload(
          this.postData?.file1
        );
      }

      if (this.postData?.file2?.name) {
        uploadObs['thumbfilename'] = this.commonService.upload(
          this.postData?.file2
        );
      }

      if (Object.keys(uploadObs)?.length > 0) {
        // this.spinner.show();
        forkJoin(uploadObs).subscribe({
          next: (res: any) => {
            if (res?.streamname?.body?.url) {
              this.postData['file1'] = null;
              this.postData['streamname'] = res?.streamname?.body?.url;
            }

            if (res?.thumbfilename?.body?.url) {
              this.postData['file2'] = null;
              this.postData['thumbfilename'] = res?.thumbfilename?.body?.url;
            }

            this.spinner.hide();
            this.progressValue = 100;
            this.createPost();
          },
          error: (err) => {
            this.spinner.hide();
          },
        });
      }
    } else {
      this.toastService.danger('Please enter mandatory fields(*) data.');
    }
  }

  startProgress() {
    const interval = setInterval(() => {
      if (this.progressValue < 92) {
        this.progressValue = this.progressValue > 92 ? this.progressValue : this.progressValue + Math.floor(Math.random() * 10);
      }
      if (this.progressValue >= 98) {
        clearInterval(interval);
      }
    }, 1000);
  }

  onTagUserInputChangeEvent(data: any): void {
    this.postData.postdescription = data?.html;
    this.postMessageTags = data?.tags;
  }

  getTagUsersFromAnchorTags = (anchorTags: any[]): any[] => {
    const tags = [];
    for (const key in anchorTags) {
      if (Object.prototype.hasOwnProperty.call(anchorTags, key)) {
        const tag = anchorTags[key];

        tags.push({
          id: tag?.getAttribute('data-id'),
          name: tag?.innerHTML,
        });
      }
    }

    return tags;
  };

  createPost(): void {
    // this.spinner.show();
    if (
      this.postData?.streamname &&
      this.postData.thumbfilename &&
      this.postData.postdescription &&
      this.postData.albumname
    ) {
      this.postData['channelId'] = this.channelId || null;
      console.log('post-data', this.postData);
      this.commonService.post(this.apiUrl, this.postData).subscribe({
        next: (res: any) => {
          this.spinner.hide();
          this.postData = null;
          // this.activeModal.close();
          this.toastService.success('Post created successfully');
        },
        error: (error) => {
          this.spinner.hide();
          console.log(error);
          this.toastService.danger(error.err.message);
        },
      });
      // this.socketService.createOrEditPost(this.postData, (data) => {
      //   this.spinner.hide();
      //   this.toastService.success('Post created successfully.');
      //   this.postData = null;
      //   return data;
      // });
    } else {
      this.toastService.danger('Please enter mandatory fields(*) data.');
    }
  }

  onSelectedVideo(event: any) {
    if (event.target?.files?.[0].type.includes('video/mp4')) {
      this.postData.file1 = event.target?.files?.[0];
      this.selectedVideoFile = URL.createObjectURL(event.target.files[0]);
      const videoSize = this.postData.file1.size;
      console.log(videoSize);
    } else {
      this.toastService.warring('please upload only mp4 files');
    }
  }

  onFileSelected(event: any) {
    this.postData.file2 = event.target?.files?.[0];
    this.selectedThumbFile = URL.createObjectURL(event.target.files[0]);
  }

  removePostSelectedFile(): void {
    this.selectedThumbFile = null;
  }

  removeVideoSelectedFile(): void {
    this.selectedVideoFile = null;
  }

  onvideoPlay(e: any): void {
    this.postData.videoduration = Math.round(e?.target?.duration);
  }

  goToHome(): void {
    this.activeModal.close();
    location.reload();
  }

  onChangeTag(event) {
    this.postData.keywords = event.target.value.replaceAll(' ', ',');
  }
}
