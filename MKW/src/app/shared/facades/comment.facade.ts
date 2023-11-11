import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommentClient, CreateReportDto } from 'src/app/core/proxies/mkw-api.proxy';
import { Store } from '@ngxs/store';
import { CommentService } from 'src/app/core/services/comment.service';
import { AddComment, AnswerComment, DeleteComment, EditComment, ReportComment, UpdateCommentList } from '../store/comments/comment.actions';
import { ReportService } from 'src/app/core/services/report.service';
import { CommentSelectors } from '../store/comments/comment.selectors';

@Injectable({
  providedIn: 'root'
})
export class CommentFacade {

  constructor(private store: Store, private reportService: ReportService) {}



  getCurrentReviewComments()
  {
    return this.store.select(CommentSelectors.GetComments);
  }

  getCurrentReviewCommentViewModel()
  {
    return this.store.select(CommentSelectors.GetCommentCardModel);
  }

  setReviewComments(reviewId: number)
  {
    return this.store.dispatch(new UpdateCommentList(reviewId));
  }

  createComment(commentText: string, reviewId: number)
  {
    return this.store.dispatch(new AddComment(commentText, reviewId));
  }

  editComment(commentText: string, reviewId: number)
  {
    return this.store.dispatch(new EditComment(commentText, reviewId));
  }

  answerComment(answerText: string, commentId: number)
  {
    return this.store.dispatch(new AnswerComment(answerText, commentId));
  }

  deleteComment(commentId: number)
  {
    return this.store.dispatch(new DeleteComment(commentId));
  }


  reportComment(reportReasonId: number, commentId: number, authorId: number)
  {
    let request = new CreateReportDto();
    request.commentId = commentId;
    request.reasonId = reportReasonId;
    request.reportedPersonId = authorId;


    return this.reportService.report(request);
  }
}
