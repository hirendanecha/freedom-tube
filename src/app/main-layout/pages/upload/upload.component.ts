import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/@shared/services/common.service';
import { ToastService } from 'src/app/@shared/services/toast.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  selectedFile: any = {};
  postData: any = {
    profileid: '',
    communityId: '',
    file: {},
    streamname: '',
    duration: null,
    thumbfilename: ''
  };
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  constructor(
    private router: Router,
    private toastService: ToastService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.postData = {}
    this.selectedFile = null
  }

  onFileSelected(event: any) {
    this.postData.file = event.target?.files?.[0];
    this.selectedFile = URL.createObjectURL(event.target.files[0]);
  }

  uploadFile() {
    if (this.postData.file) {
      const maxSize = 100 * 1024 * 1024; // 100MB (adjust as needed)

      if (this.postData.file.size <= maxSize) {
        this.router.navigate(['/upload/details'], {
          state: { data: this.postData }
        });
      } else {
        this.toastService.danger('Invalid file format or size.');
      }
    }
  }

  onVideoPlay(e: any): void {
    this.postData.duration = e.timeStamp
    const video: HTMLVideoElement = this.videoPlayer?.nativeElement;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const img = canvas.getContext('2d')
    img?.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.postData.thumbfilename = canvas.toDataURL('image/jpeg');
  }

  removeVideo() {
    this.postData.file = null;
    this.selectedFile = null
  }

}
