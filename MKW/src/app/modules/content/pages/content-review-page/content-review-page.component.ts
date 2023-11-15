import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCard } from 'src/app/shared/models/content-card.model';
import { ContentReviewPage } from '../../models/content-review-page.model';
import { Observable, Subscription, catchError, take, tap } from 'rxjs';
import { ReviewService } from 'src/app/core/services/review.service';
import { AnswerCommentDto, CreateCommentDto, CreateReportDto, ICreateCommentDto, ReviewDetailsDtoBaseResponseDTO, UpdateCommentDto } from 'src/app/core/proxies/mkw-api.proxy';
import { CommentService } from 'src/app/core/services/comment.service';
import { ContentReviewComment } from "src/app/modules/content/models/content-review-page.model";
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { CommentFacade } from 'src/app/shared/facades/comment.facade';
import { ModalController } from '@ionic/angular';
import { ReviewFacade } from 'src/app/shared/facades/review.facade';
import { ReviewEditModalComponent } from '../../components/review-edit-modal/review-edit-modal.component';
import { ReportReview } from 'src/app/shared/store/review/review.actions';
import { ReportReviewModalComponent } from '../../components/report-review-modal/report-review-modal.component';
import { Store } from '@ngxs/store';
import { UserSelectors } from 'src/app/shared/store/user/user.selectors';
import { UserFacade } from 'src/app/shared/facades/user.facade';
import { AwardReviewModalComponent } from '../../components/award-review-modal/award-review-modal.component';

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
    }
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
    private userFacade: UserFacade) {
  }

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

          let username = this.userFacade.getUserState()?.username!
          this.actionSheetButtons = username == this.contentObject.reviewAuthor.userName ? this.actionSheetOp : this.actionSheetNotOp;
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
          alert("Erro buscando os comentários dessa análise")
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
        next: (res) => {
          alert("Review excluída com sucesso");
          this.router.navigate(['home/feed']);
        },
        error: (err) => {
          alert("Erro ao excluir review");
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
          alert("Review editada com sucesso")
        },
        error: (err) => {
          alert("Erro ao editar review");
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
          alert("Review denunciada com sucesso")
        },
        error: (err) => {
          alert("Erro ao denunciar review");
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
          alert("Award dado com sucesso!")
        },
        error: (err) => {
          alert("Erro ao dar award!");
        }
      })


  }
  public actionSheetButtons: any[] = [];

  private actionSheetOp = [
    {
      text: 'Deletar',
      role: 'destructive',
      data: {
        action: 'delete',
      }
    },
    {
      text: 'Editar',
      data: {
        action: 'edit',
      }
    },

    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      }
    }
  ]

  private actionSheetNotOp = [
    {
      text: 'Denunciar',
      data: {
        action: 'report',
      }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      }
    }
  ]

}
