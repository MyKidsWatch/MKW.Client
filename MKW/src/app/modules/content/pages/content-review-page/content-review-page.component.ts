import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCard } from 'src/app/shared/models/content-card.model';
import { ContentReviewPage } from '../../models/content-review-page.model';
import { take } from 'rxjs';
import { ReviewService } from 'src/app/core/services/review.service';
import { AnswerCommentDto, CreateCommentDto, CreateReportDto, ICreateCommentDto, ReviewDetailsDtoBaseResponseDTO, UpdateCommentDto } from 'src/app/core/proxies/mkw-api.proxy';
import { CommentService } from 'src/app/core/services/comment.service';
import { ContentReviewComment } from "src/app/modules/content/models/content-review-page.model";
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { CommentFacade } from 'src/app/shared/facades/comment.facade';
import { ModalController } from '@ionic/angular';
import { ReviewFacade } from 'src/app/shared/facades/review.facade';

@Component({
  selector: 'app-content-review-page',
  templateUrl: './content-review-page.component.html',
  styleUrls: ['./content-review-page.component.scss'],
})
export class ContentReviewPageComponent  implements OnInit {


  public reviewId?: number;
  public contentObject?: ContentReviewPage;
  public loading: boolean = true;


  public reviewComments: ContentReviewComment[] = [];
  
  public newComment = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private commentFacade: CommentFacade,
    private modalController: ModalController,
    private reviewFacade: ReviewFacade
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reviewId = id;

    this.reviewFacade.setCurrentReview(this.reviewId);
    this.commentFacade.setReviewComments(this.reviewId);

    this.commentFacade.getCurrentReviewCommentViewModel()
    .subscribe({
      next: (res: ContentReviewComment[]) =>{
        console.log(res)
        this.reviewComments = res;
      },
      error: (err) =>{
        alert("Erro buscando os comentários dessa análise")
      }
    })

    this.reviewService.getReviewById(id)
    .pipe(take(1))
    .subscribe({
      next: (res: ReviewDetailsDtoBaseResponseDTO) =>{
        this.contentObject = ContentUtils.ContentReviewToPage(res.content![0])!
        this.loading = false
      },
      error: (err: any) => {
        console.log(err);
      }
    })

  }

  goBack() {
    window.history.back();
  }

  goToContentPage(contentId: any, platformId: any)
  {

    this.router.navigate(['home/content/feed', contentId, platformId])
  }

  addCommentToReview()
  {
    this.commentFacade.createComment(this.newComment, this.reviewId!)
    .pipe(take(1))
    .subscribe(res => console.log);
    this.newComment = '';
  }




  actionSheetEvent(event: any, commentId: number)
  {
    let action = event.detail?.data?.action;

    if(!action)
      return;
    switch(action)
    {
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

  deleteReview()
  {

  }

  async openEditModal()
  {
    const modal = await this.modalController.create({component: ContentReviewPageComponent})
  }

  async openReportModal()
  {
    const modal = await this.modalController.create({component: ContentReviewPageComponent})

  }

  public actionSheetButtons = [
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
    },
  ];
}
