import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { CommonService } from 'src/app/@shared/services/common.service';
import { ToastService } from 'src/app/@shared/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent {
  apiUrl = environment.apiUrl + 'posts/create-post'
  videoSize = 0;
  uploadProgress = 80;
  uploadVideoData: any;
  videoUrl = ''
  postData: any = {
    profileid: null,
    communityId: null,
    postdescription: '',
    tags: [],
    imageUrl: '',
    videoduration: '',
    thumbfilename: '',
    streamname: '',
    posttype: 'V'
  };
  postMessageTags: any[];
  postMessageInputValue: string = '';
  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private toasterService: ToastService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    const userData = JSON.parse(this.authService.getUserData() as any)
    this.postData.profileid = userData.profileId
    console.log(history.state.data);
    if (history.state.data) {
      this.uploadVideoData = { ...history.state.data };
      this.videoSize = this.uploadVideoData?.file?.size / 1024 / 1024;
      this.postData.videoduration = Math.round(this.uploadVideoData.duration);
      this.convertBase64ToImage(this.uploadVideoData.thumbfilename);
    } else {
      this.router.navigate(['/upload']);
    }
  }


  ngOnInit() {
  }

  onSaveClick(): void {
    this.postData.tags = this.getTagUsersFromAnchorTags(this.postMessageTags)
    console.log(this.postData)
    this.spinner.show();
    this.commonService.upload(this.uploadVideoData?.file).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        if (res.url) {
          this.postData.streamname = res?.body.url;
          this.createPost();
        }
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      }
    });
  }

  convertBase64ToImage(image: any): void {
    const binaryString = window.atob(image.split(',')[1]);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'image/png' });
    this.postData.thumbfilename = URL.createObjectURL(blob);
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
  }

  createPost(): void {
    if (this.postData?.streamname) {
      this.commonService.post(this.apiUrl, this.postData).subscribe({
        next: (res: any) => {
          this.router.navigate(['/home']);
          this.toasterService.success('Post created successfully')
        }, error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
