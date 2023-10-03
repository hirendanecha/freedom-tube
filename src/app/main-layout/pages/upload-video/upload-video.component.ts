import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent {

  uploadForm!: FormGroup;

  videoTitle = 'Contrary to popular belief, Lorem Ipsum (2020) is not.';
  videoSize = '102.6 MB';
  videoDuration = '2:13 MIN Remaining';
  uploadProgress = 80; // Set the initial progress value
  postdescription = 'Description';
  uploadStatus = 'Your Video is still uploading, please keep this page open until it\'s done.';

  constructor(
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      id: [null],
      postdescription: [''],
      postcreationdate: [new Date()],
      posttype: ['V'],
      albumname: [''],
      profileid: [''],
      likescount: [0],
      dislikecount: [0],
      streamname: [''],
      viewcount: [0],
      videoduration: [''],
      thumbfilename: [''],
      isdeleted: ['N'],
    });
  }


  onSaveClick() {
    const dataToSave = {
      title: this.videoTitle,
      description: this.postdescription,
    };

    console.log('dataToSave', dataToSave);
    
  }
}
