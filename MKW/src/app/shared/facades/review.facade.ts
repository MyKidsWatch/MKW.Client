import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommentClient, CreateReportDto } from 'src/app/core/proxies/mkw-api.proxy';
import { Store } from '@ngxs/store';
import { CommentService } from 'src/app/core/services/comment.service';
import { AddComment, AnswerComment, DeleteComment, EditComment, ReportComment, UpdateCommentList } from '../store/comments/comment.actions';
import { ReportService } from 'src/app/core/services/report.service';
import { CommentSelectors } from '../store/comments/comment.selectors';
import { ReviewService } from 'src/app/core/services/review.service';
import { ReviewSelectors } from '../store/review/review.selectors';
import { CreateReview, DeleteReview, EditReview, SetReviewState } from '../store/review/review.actions';
import { title } from 'process';

@Injectable({
  providedIn: 'root'
})

export class ReviewFacade{

    constructor(
      private store: Store, 
      private reviewService: ReviewService,
      private reportService: ReportService){}


    getCurrentReview()
    {
      return this.store.select(ReviewSelectors.GetCurrentReview);
    }

    getCurrentReviewId()
    {
      return this.store.selectSnapshot(ReviewSelectors.GetCurrentReviewId);
    }

    getCurrentReviewViewModel()
    {
      return this.store.select(ReviewSelectors.GetReviewViewModel);
    }

    setCurrentReview(reviewId: number)
    {
      return this.store.dispatch(new SetReviewState(reviewId))
    }

    createReview(contentId: string, platformId: number, reviewTitle: string, rating: number, text?: string)
    {
      return this.store.dispatch(new CreateReview(reviewTitle, rating, platformId, contentId, text))
    }

    editReview(reviewId: number, title: string, rating: number, text: string)
    {
      return this.store.dispatch(new EditReview(reviewId, title, text, rating))
    }

    deleteReview(reviewId: number)
    {
      return this.store.dispatch(new DeleteReview(reviewId));
    }

    reportReview(reportReasonId: number, reviewId: number)
    {
        let reportDto: CreateReportDto = new CreateReportDto();

        reportDto.reasonId = reportReasonId;
        reportDto.reviewId = reviewId;

        return this.reportService.report(reportDto);
    }

}