import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommentClient, CreateReportDto } from 'src/app/core/proxies/mkw-api.proxy';
import { Store } from '@ngxs/store';
import { CommentService } from 'src/app/core/services/comment.service';
import { AddComment, AnswerComment, DeleteComment, EditComment, ReportComment } from '../store/comments/comment.actions';
import { ReportService } from 'src/app/core/services/report.service';

@Injectable({
  providedIn: 'root'
})
export class ContentFacade {

  constructor(private store: Store, private reportService: ReportService) {}

  getReviewComments()
  {
    
  }


  createComment(commentText: string, reviewId: number)
  {
    return this.store.dispatch(new AddComment(commentText, reviewId));
  }

  editComment(commentText: string, reviewId: number)
  {
    return this.store.dispatch(new EditComment(commentText, reviewId));
  }

  answerComment(answerText: string, reviewId: number)
  {
    return this.store.dispatch(new AnswerComment(answerText, reviewId));
  }

  deleteComment(commentId: number)
  {
    return this.store.dispatch(new DeleteComment(commentId));
  }

  reportComment(reportReasonId: number, commentId: number)
  {
    let request = new CreateReportDto();
    request.commentId = commentId;
    request.reasonId = reportReasonId;

    return this.reportService.report(request);
  }
}
