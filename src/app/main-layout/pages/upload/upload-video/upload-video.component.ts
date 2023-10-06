import { Component } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { CommonService } from 'src/app/@shared/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent {
  apiUrl = environment.apiUrl + 'posts/video-post'
  videoSize = 0;
  uploadProgress = 80;
  uploadVideoData: any = {}
  videoUrl = ''
  postData: any = {
    profileid: '',
    communityId: '',
    postdescription: '',
    tags: [],
    imageUrl: '',
    videoduration: '',
    thumbfilename: '',
    streamname: ''
  };
  constructor(
    private commonService: CommonService,
    private authService: AuthService
  ) {
    const userData = JSON.parse(this.authService.getUserData() as any)
    this.postData.profileid = userData.profileId
    this.uploadVideoData = { ...history.state.data };
    console.log(this.uploadVideoData);
    this.postData.streamname = URL.createObjectURL(this.uploadVideoData?.file)
    this.videoSize = this.uploadVideoData?.file?.size / 1024 / 1024;
    this.postData.videoduration = Math.round(this.uploadVideoData.duration);
    this.convertBase64ToImage(this.uploadVideoData.thumbfilename);
  }


  ngOnInit() {
  }

  onSaveClick() {
    console.log(this.postData)
    // this.commonService.upload(this.uploadVideoData?.file).subscribe({
    //   next: (res: any) => {
    //     this.postData.streamname = res.url;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });

    // this.commonService.post(this.apiUrl, this.postData).subscribe({
    //   next: (res: any) => {
    //     console.log(res)
    //   }, error: (error) => {
    //     console.log(error);
    //   }
    // })
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
}
