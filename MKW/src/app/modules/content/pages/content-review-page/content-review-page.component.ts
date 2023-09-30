import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCard } from 'src/app/shared/models/content-card.model';
import { ContentReviewPage } from '../../models/content-review-page.model';
import { take } from 'rxjs';
import { ReviewService } from 'src/app/core/services/review.service';
import { AnswerCommentDto, CreateCommentDto, ICreateCommentDto, ReviewDetailsDtoBaseResponseDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { CommentService } from 'src/app/core/services/comment.service';
import { AnswerEvent } from 'src/app/shared/components/comment-card/comment-card.component';
import { ContentReviewComment } from "src/app/modules/content/models/content-review-page.model";

@Component({
  selector: 'app-content-review-page',
  templateUrl: './content-review-page.component.html',
  styleUrls: ['./content-review-page.component.scss'],
})
export class ContentReviewPageComponent  implements OnInit {


  public reviewId?: number;
  public contentObject?: ContentReviewPage;
  public loading: boolean = true;


  public newComment = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reviewId = id;

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

    let addCommentDTO: ICreateCommentDto = {
      reviewId: this.reviewId,
      text: this.newComment
    }

    this.newComment = '';
    
    this.commentService.publishComment(new CreateCommentDto(addCommentDTO))
    .pipe(take(1))
    .subscribe(
      {

        next: (res) =>{
            console.log(res);
            let newCommentInformation = res.content![0]

            let newComment: ContentReviewComment = {
              commentResponses: [],
              commentAuthor: {
                userName: newCommentInformation.person?.username!,
                profilePictureUrl: 'assets/icon/default.jpg'
              },
              commentId: newCommentInformation.id!,
              commentText: newCommentInformation.text!
          }

          this.contentObject?.reviewComments.push(newComment);
        },
        error: (err) =>{
          
        }
      }
    )
  }

  addAnswerToComment(answerEvent: AnswerEvent)
  {

    let answerCommentDTO = new AnswerCommentDto();
    answerCommentDTO.commentId = answerEvent.commentId;
    answerCommentDTO.text = answerEvent.answerText;
    
    this.commentService.publishAnswer(answerCommentDTO)
    .pipe(take(1))
    .subscribe(
      {

        next: (res) =>{
            
            let newAnswerInformation = res.content![0]
            let comment = this.contentObject?.reviewComments.find(x => x.commentId == answerEvent.commentId)

            let newAnswer: ContentReviewComment = {
                commentResponses: [],
                commentAuthor: {
                  userName: newAnswerInformation.person?.username!,
                  profilePictureUrl: 'assets/icon/default.jpg'
                },
                commentId: newAnswerInformation.id!,
                parentCommentId: answerEvent.commentId,
                commentText: answerEvent.answerText!
            }
            comment?.commentResponses.push(newAnswer);
        },
        error: (err) =>{
          
        }
      }
    )
  }

}
