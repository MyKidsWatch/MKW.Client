import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentReviewPage } from '../../models/content-review-page.model';
import { Subscription, take,  } from 'rxjs';
import { ContentReviewComment } from "src/app/modules/content/models/content-review-page.model";
import { CommentFacade } from 'src/app/shared/facades/comment.facade';
import { ModalController } from '@ionic/angular';
import { ReviewFacade } from 'src/app/shared/facades/review.facade';
import { ReviewEditModalComponent } from '../../components/review-edit-modal/review-edit-modal.component';
import { ReportReviewModalComponent } from '../../components/report-review-modal/report-review-modal.component';
import { UserFacade } from 'src/app/shared/facades/user.facade';
import { AwardReviewModalComponent } from '../../components/award-review-modal/award-review-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-content-review-page',
  templateUrl: './content-review-page.component.html',
  styleUrls: ['./content-review-page.component.scss'],
})
export class ContentReviewPageComponent implements OnInit {
  public reviewId?: number;
  public canAward: boolean = false;

  public contentObject: ContentReviewPage = {
    reviewAuthor: {
      userName: '',
      creatorId: 0
    },
    reviewCreationDate: new Date(),
    reviewedContentInformation: {
      contentId: 0,
      externalContentId: 0,
      platformId: 0,
      title: '',
      picturePath: ''
    },
    reviewId: 0,
    reviewRating: 0,
    reviewTitle: '',
    reviewDescription: '',
    reviewAwardInformation: {
      bronzeAwardCount: 0,
      goldenAwardCount: 0,
      silverAwardCount: 0
    },
    reviewIsEdited: false
  };
  public loading: boolean = true;


  public reviewComments: ContentReviewComment[] = [];


  private reviewSubscription?: Subscription;
  private commentSubscription?: Subscription;
  public newComment = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentFacade: CommentFacade,
    private modalController: ModalController,
    private reviewFacade: ReviewFacade,
    private userFacade: UserFacade,
    private translateService: TranslateService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reviewId = id;

    this.reviewFacade.setCurrentReview(this.reviewId);
    this.commentFacade.setReviewComments(this.reviewId);

    this.reviewSubscription = this.reviewFacade.getCurrentReviewViewModel()
      .subscribe({
        next: (res: ContentReviewPage) => {

          this.contentObject = res;
          this.loading = false;

          let username = this.userFacade.getUserState()?.username!;

          let isOp = username == this.contentObject.reviewAuthor.userName;

          if (!isOp) {
            this.actionSheetButtons = this.actionSheetNotOp;
          }
          else {
            this.actionSheetButtons = this.contentObject.reviewIsEdited ? this.actionSheetOpNotEditable : this.actionSheetOp;
          }

          this.canAward = username !== this.contentObject.reviewAuthor.userName
        },
        error: (err) => {

        }
      });

    this.commentSubscription = this.commentFacade.getCurrentReviewCommentViewModel()
      .subscribe({
        next: (res: ContentReviewComment[]) => {
          console.log(res)
          this.reviewComments = res;
        },
        error: (err) => {
          this.toastService.showError(this.translateService.instant('genericError'));
        }
      });
  }

  goBack() {
    this.router.navigate([".."]);
    this.commentSubscription?.unsubscribe();
    this.reviewSubscription?.unsubscribe();

  }

  goToContentPage(contentId: any, platformId: any) {

    this.router.navigate(['home/content/feed', contentId, platformId])
  }

  addCommentToReview() {
    this.commentFacade.createComment(this.newComment, this.reviewId!)
      .pipe(take(1))
      .subscribe(res => console.log);
    this.newComment = '';
  }

  actionSheetEvent(event: any, commentId: number) {
    if (!event.detail.data || !event.detail.data.action)
      return;

    let action = event.detail?.data?.action;

    if (!action)
      return;
    switch (action) {
      case 'delete':
        this.deleteReview();
        break;
      case 'edit':
        this.openEditModal();
        break;
      case 'report':
        this.openReportModal();
        break;
    }
  }

  deleteReview() {

    this.reviewFacade.deleteReview(this.reviewId!)
      .subscribe({
          this.userFacade.updateUserReviews();
          this.toastService.showSuccess(this.translateService.instant('reviewDeleted'));
        },
        error: (err) => {
          this.toastService.showError(this.translateService.instant('genericError'));
        }
      })
  }

  async openEditModal() {
    const modal = await this.modalController.create({ component: ReviewEditModalComponent })

    modal.present();

    let result = await modal.onWillDismiss();


    if (result.data === null || result.role != 'edit')
      return;

    this.reviewFacade.editReview(this.reviewId!, result.data.title, result.data.stars, result.data.text)
      .subscribe({
        next: (res) => {
          this.userFacade.updateUserReviews();
          this.toastService.showSuccess(this.translateService.instant('reviewEdited'));
        },
        error: (err) => {
          this.toastService.showError(this.translateService.instant('genericError'));
        }
      })
  }

  async openReportModal() {
    const modal = await this.modalController.create({ component: ReportReviewModalComponent })

    modal.present();

    let result = await modal.onWillDismiss();


    if (result.data === null || result.role != 'report')
      return;

    this.reviewFacade.reportReview(result.data, this.reviewId!, this.contentObject.reviewAuthor.creatorId)
      .subscribe({
        next: (res) => {
          this.toastService.showSuccess(this.translateService.instant('reportSuccess'));
        },
        error: (err) => {
          this.toastService.showError(this.translateService.instant('genericError'));
        }
      })
  }


  async openAwardModal() {
    const modal = await this.modalController.create({ component: AwardReviewModalComponent })

    modal.present();

    let result = await modal.onWillDismiss();

    console.log(result);
    if (result.data === null || result.role != 'award')
      return;

    this.reviewFacade.giveCurrentReviewAward(result.data!)
      .subscribe({
        next: (res) => {
          this.toastService.showSuccess(this.translateService.instant('awardSuccess'));
        },
        error: (err) => {
          this.toastService.showError(this.translateService.instant('genericError'));
        }
      })


  }
  public actionSheetButtons: any[] = [];

  private actionSheetOpNotEditable = [
    {
      text: this.translateService.instant('delete'),
      role: 'destructive',
      data: {
        action: 'delete',
      }
    },
    {
      text: this.translateService.instant('cancel'),
      role: 'cancel',
      data: {
        action: 'cancel',
      }
    }
  ]

  private actionSheetOp = [
    {
      text: this.translateService.instant('delete'),
      role: 'destructive',
      data: {
        action: 'delete',
      }
    },
    {
      text: this.translateService.instant('edit'),
      data: {
        action: 'edit',
      }
    },

    {
      text: this.translateService.instant('cancel'),
      role: 'cancel',
      data: {
        action: 'cancel',
      }
    }
  ]

  private actionSheetNotOp = [
    {
      text: this.translateService.instant('report'),
      data: {
        action: 'report',
      }
    },
    {
      text: this.translateService.instant('cancel'),
      role: 'cancel',
      data: {
        action: 'cancel',
      }
    }
  ]

}
