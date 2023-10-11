import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReplyCommentModalComponent } from 'src/app/@shared/components/reply-comment-modal/reply-comment-modal.component';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { CommonService } from 'src/app/@shared/services/common.service';
import { SocketService } from 'src/app/@shared/services/socket.service';
import { ToastService } from 'src/app/@shared/services/toast.service';
import { environment } from 'src/environments/environment';
declare var Clappr: any;
declare var jwplayer: any;
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  @ViewChild('parentPostCommentElement', { static: false }) parentPostCommentElement: ElementRef;
  @ViewChild('childPostCommentElement', { static: false }) childPostCommentElement: ElementRef;

  videoDetails: any = {};
  channelDetails: any = {};
  apiUrl = environment.apiUrl + 'channels';
  commentapiUrl = environment.apiUrl + 'posts';
  videoList: any = [];

  profileId: number;
  isOpenCommentsPostId: number = null;

  commentList: any = [];
  replyCommentList: any = [];
  isReply = false;
  isReplyComments: boolean = false;
  commentId = null;
  commentData: any = {
    file: null,
    url: '',
  };
  isParent: boolean = false;
  postComment = {};
  isCommentsLoader: boolean = false;
  isPostComment: boolean = false;
  player: any;
  // webUrl = environment.webUrl;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private socketService: SocketService,
    public authService: AuthService,
    private renderer: Renderer2,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.profileId = JSON.parse(
      this.authService.getUserData() as any
    ).profileId;

    this.route.params.subscribe(
      params => {
        const id = +params['id']
        console.log('>>>>>', id)
        if (id) {
          this.videoDetails = history?.state?.data;
          console.log(this.videoDetails)
          this.viewComments(id);
          this.playvideo(id);
        }
      });
    // this.router.events.subscribe((event: any) => {
    //   const id = event?.routerEvent?.url.split('/')[1];

    // });
  }

  ngOnInit(): void {
    this.getMyChannels();
    this.getPostVideosById();
  }

  getMyChannels(): void {
    this.spinner.show();
    this.commonService
      .getById(
        this.apiUrl,
        { id: this.videoDetails.profileid }
        // this.userData.profileId
      )
      .subscribe({
        next: (res) => {
          this.spinner.hide()
          console.log(res);
          this.channelDetails = res[0];
        },
        error: (error) => {
          this.spinner.hide()
          console.log(error);
        },
      });
  }

  getPostVideosById(): void {
    this.commonService
      .post(`${this.apiUrl}/posts`, { size: 15, page: 1 })
      .subscribe({
        next: (res: any) => {
          this.videoList = res.data;
          console.log(res);
          // this.playvideo();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  playvideo(id: any) {
    let i = setInterval(()=>{

      if(this.player) {
        this.player.remove();
      }
      console.log('enter', id);
    const config = {
      file: this.videoDetails?.streamname,
      image: this.videoDetails?.thumbfilename,
      mute: false,
      autostart: false,
      volume: 30,
      height: '640px',
      width: 'auto',
      pipIcon: "disabled",
      playbackRateControls: false,
      preload: "metadata",
      aspectratio: "16:9",
      autoPause: {
        viewability: true
      },
      events: {
        onError: function (e: any) {
          console.log(e);
        },
      },
    }
    console.log(">>>>> config", JSON.stringify(config))
    this.player = jwplayer('jwVideo-' + id).setup({
     ...config
    });
    this.player.load();
    console.log(">>>>>", this.player);

    if(this.player) clearInterval(i)

    }, 1000)
    
    
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
        this.toastService.danger(`sorry ${file.type} are not allowed!`);
      }
    } else {
      this.toastService.warring('Image is too large!');
    }
  }
  removePostSelectedFile(): void {
    this.commentData['file'] = null;
    this.commentData['imageUrl'] = '';
  }

  commentOnPost(parentPostCommentElement, postId, commentId = null): void {
    const postComment = parentPostCommentElement.innerHTML;
    console.log(this.commentData);
    if (this.isPostComment === false) {
      if (postComment || this.commentData?.file?.name) {
        this.isPostComment = true;
        this.commentData.comment = postComment;
        this.commentData.postId = postId;
        this.commentData.profileId = this.profileId;
        if (commentId) {
          this.commentData['parentCommentId'] = commentId;
        }
        this.addComment();
        parentPostCommentElement.innerHTML = '';
      } else {
        this.toastService.danger('Please enter comment');
      }
    }
  }

  viewComments(id: number): void {
    this.isOpenCommentsPostId = id;
    this.isCommentsLoader = true;
    this.commonService.get(`${this.commentapiUrl}/comments/${id}`).subscribe({
      next: (res) => {
        console.log('comments DATA', res);

        if (res) {
          this.commentList = res.data.commmentsList.map((ele: any) => ({
            ...ele,
            replyCommnetsList: res.data.replyCommnetsList.filter((ele1) => {
              return ele.id === ele1.parentCommentId;
            }),
          }));
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isCommentsLoader = false;
      },
    });
  }

  addComment(): void {
    if (this.commentData?.parentCommentId) {
      this.socketService.commentOnPost(this.commentData, (data) => {
        this.toastService.success('replied on comment');
        this.postComment = '';
        this.commentData = {};
        // childPostCommentElement.innerText = '';
      });
      this.socketService.socket.on('comments-on-post', (data: any) => {
        this.isPostComment = false;
        this.commentList.map((ele: any) =>
          data.filter((ele1) => {
            if (ele.id === ele1.parentCommentId) {
              ele?.['replyCommnetsList'].push(ele1);
              return ele;
            }
          })
        );
        this.viewComments(this.commentData?.postId);
        this.isReply = false;
        this.commentId = null;
      });
    } else {
      this.socketService.commentOnPost(this.commentData, (data) => {
        this.toastService.success('comment added on post');
        this.commentData.comment = '';
        this.commentData = {};
        // parentPostCommentElement.innerText = '';
      });
      this.socketService.socket.on('comments-on-post', (data: any) => {
        console.log('commnets data', data);
        // this.isPostComment = false;
        // this.commentList.push(data[0]);
        this.viewComments(data[0]?.postId);
        // this.commentData.comment = '';
        // this.commentData = {}
        // parentPostCommentElement.innerText = '';
      });
    }
  }

  showReplySection(id) {
    this.isReply = this.commentId == id ? false : true;
    this.commentId = id;
    if (!this.isReply) {
      this.commentId = null;
    }
    this.isReplyComments = false;
  }

  showReplyedComments(id) {
    this.isReplyComments = this.commentId == id ? false : true;
    this.commentId = id;
    if (!this.isReplyComments) {
      this.commentId = null;
    }
    this.isReply = false;
  }

  likeComments(comment) {
    comment.likeCount = comment.likeCount + 1;
    comment.react = 'L';
    const data = {
      postId: comment.postId,
      commentId: comment.id,
      profileId: Number(this.profileId),
      toProfileId: Number(comment.profileId),
      likeCount: comment.likeCount,
      actionType: 'L',
    };
    this.socketService.likeFeedComments(data, (res) => {
      return;
    });
  }

  disLikeComments(comment) {
    comment.likeCount = comment.likeCount - 1;
    comment.react = null;
    const data = {
      postId: comment.postId,
      commentId: comment.id,
      profileId: Number(this.profileId),
      toProfileId: Number(comment.profileId),
      likeCount: comment.likeCount,
    };
    this.socketService.likeFeedComments(data, (res) => {
      return;
    });
  }


  // editComment(comment): void {
  //   if (comment.parentCommentId) {
  //     this.renderer.setProperty(
  //       this.childPostCommentElement?.nativeElement,
  //       'innerHTML',
  //       comment.comment
  //     );
  //     this.commentData['id'] = comment.id
  //     if (comment.imageUrl) {
  //       this.commentData['imageUrl'] = comment.imageUrl
  //       this.isParent = true;
  //     }
  //   } else {
  //     this.renderer.setProperty(
  //       this.parentPostCommentElement?.nativeElement,
  //       'innerHTML',
  //       comment.comment
  //     );
  //     this.commentData['id'] = comment.id
  //     if (comment.imageUrl) {
  //       this.commentData['imageUrl'] = comment.imageUrl
  //       this.isParent = true;
  //     }
  //   }
  //   console.log(comment);
  // }


  editComment(comment): void {
    if (comment.parentCommentId) {
      const modalRef = this.modalService.open(ReplyCommentModalComponent, {
        centered: true,
      });
      modalRef.componentInstance.title = 'Edit Comment';
      modalRef.componentInstance.confirmButtonLabel = 'Comment';
      modalRef.componentInstance.cancelButtonLabel = 'Cancel';
      modalRef.componentInstance.data = comment;
      modalRef.result.then((res) => {
        if (res) {
          console.log('resDATA', res);

          this.commentData.comment = res?.comment;
          this.commentData.postId = res?.postId;
          this.commentData.profileId = res?.profileId;
          this.commentData['id'] = res?.id
          this.commentData.parentCommentId = res?.parentCommentId
          this.addComment();
        }
      });
    } else {
      this.renderer.setProperty(
        this.parentPostCommentElement?.nativeElement,
        'innerHTML',
        comment.comment
      );
      this.commentData['id'] = comment.id
      if (comment.imageUrl) {
        this.commentData['imageUrl'] = comment.imageUrl
        this.isParent = true;
      }
    }
    console.log(comment);
  }

  deleteComments(id): void {
    this.commonService.delete(`${this.commentapiUrl}/comments/${id}`).subscribe({
      next: (res: any) => {
        this.toastService.success(res.message);
        this.viewComments(id);
      },
      error: (error) => {
        console.log(error);
        this.toastService.danger(error.message);
      },
    });
  }
}
