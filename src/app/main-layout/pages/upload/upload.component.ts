import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/@shared/services/toast.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  selectedFile: File | null = null;
  postData: any = {
    profileid: '',
    communityId: '',
    postdescription: '',
    file: {},
    streamname: '',
  };

  constructor(private router: Router, private toastService: ToastService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const url = URL.createObjectURL(event.target.files[0]);
    this.postData.streamname = url;
    console.log('url', this.postData.streamname);
  }

  uploadFile() {
    if (this.selectedFile) {
      const maxSize = 100 * 1024 * 1024; // 100MB (adjust as needed)

      if (this.selectedFile.size <= maxSize) {
        // console.log('File is valid and ready for upload:', this.selectedFile);
        this.router.navigate(['/upload-video']);
      } else {
        this.toastService.danger('Invalid file format or size.');
      }
    }
  }

  removeVideo() {
    this.postData.streamname = null;
    this.selectedFile = null
  }
}
