import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/@shared/services/common.service';
import { ToastService } from 'src/app/@shared/services/toast.service';
import { environment } from 'src/environments/environment';
declare var Clappr: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videoDetails: any = {}
  channelDetails: any = {}
  apiUrl = environment.apiUrl + 'channels';
  videoList: any = []

  profileId = '';
  isOpenCommentsPostId: number = null;

  commentList: any = [];
  replyCommentList: any = [];
  isReply = false;

  commentId = null;
  commentData: any = {
    file: null,
    url: ''
  };
  isParent: boolean = false;
  postComment = {};
  isCommentsLoader: boolean = false;
  isPostComment: boolean = false;
  // webUrl = environment.webUrl;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.router.events.subscribe((event: any) => {
      const id = event?.routerEvent?.url.split('/')[1];
      if (id) {
        this.videoDetails = history.state.data;
      }
    });
    console.log(this.videoDetails)
  }

  ngOnInit(): void {
    this.getMyChannels();
  }

  getMyChannels(): void {
    this.commonService.getById(
      this.apiUrl,
      { id: 62446 }
      // this.userData.profileId
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.channelDetails = res[0];
        this.getPostVideosById()
      }, error: (error) => {
        console.log(error);
      }
    })
  }

  getPostVideosById(): void {
    this.commonService.post(`${this.apiUrl}/posts`, { size: 10, page: 1 }).subscribe({
      next: (res: any) => {
        this.videoList = res.data
        console.log(res);
        this.playvideo();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  playvideo(): void {
    let player = new Clappr.Player({
      source: 'https://s3-us-west-1.amazonaws.com/freedom-social/' + this.videoDetails.streamname,
      parentId: '#video-' + this.videoDetails.id,
      height: '500px',
      width: 'auto',
      events: {
        onError: function (e: any) {
          console.log(e);

        }
      }
    })
  }

  onPostFileSelect(event: any, type: string): void {
    if (type === 'parent') {
      this.isParent = true;
    } else {
      this.isParent = false;
    }
    const file = event.target?.files?.[0] || {};
    if (file?.size < 5120000) {
      if (file.type.includes('image/')) {
        this.commentData['file'] = file;
        this.commentData['imageUrl'] = URL.createObjectURL(file);
      } else {
        this.toastService.danger(`sorry ${file.type} are not allowed!`)
      }
    } else {
      this.toastService.warring('Image is too large!');
    }
  }
  removePostSelectedFile(): void {
    this.commentData['file'] = null;
    this.commentData['imageUrl'] = '';
  }

  showReplySection() {
    this.isPostComment= !this.isPostComment

    console.log('this.isPostComment', this.isPostComment);
    
  }

  
  commentOnPost(parentPostCommentElement, postId, commentId = null): void {
    const postComment = parentPostCommentElement.innerHTML;
    console.log(this.commentData)
    if (this.isPostComment === false) {
      if (postComment || this.commentData?.file?.name) {
        this.isPostComment = true;
        this.commentData.comment = postComment;
        this.commentData.postId = postId;
        // this.commentData.profileId = this.profileId;
        if (commentId) {
          this.commentData['parentCommentId'] = commentId;
        }
        // this.uploadCommentFileAndAddComment()
        parentPostCommentElement.innerHTML = ''
      } else {
        // this.toastService.clear();
        this.toastService.danger('Please enter comment');
      }
    }
  }
}
