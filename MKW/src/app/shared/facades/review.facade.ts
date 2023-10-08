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
import { SetReviewState } from '../store/review/review.actions';

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

    getCurrentReviewViewModel()
    {
      return this.store.select(ReviewSelectors.GetReviewViewModel);
    }

    setCurrentReview(reviewId: number)
    {
      return this.store.dispatch(new SetReviewState(reviewId))
    }

    createReview(reviewTitle: string, rating?: number, text?: string)
    {

    }

    editReview(reviewId: number, rating: number, text: string)
    {

    }

    deleteReview(reviewId: number)
    {

    }

    reportReview(reportReasonId: number, reviewId: number)
    {
        let reportDto: CreateReportDto = new CreateReportDto();

        reportDto.reasonId = reportReasonId;
        reportDto.reviewId = reviewId;

        return this.reportService.report(reportDto);
    }

}