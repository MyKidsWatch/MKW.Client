import { Injectable } from '@angular/core';
import { AnswerCommentDto, CommentClient, CommentDetailsDtoBaseResponseDTO, CreateCommentDto, CreateReportDto, ReportClient, UpdateCommentDto } from '../proxies/mkw-api.proxy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private commentClient: CommentClient, private reportClient: ReportClient) { }

  publishComment(request: CreateCommentDto) : Observable<CommentDetailsDtoBaseResponseDTO>
  { 
    let res = this.commentClient.commentPost(request); 
    return res;
  }

  publishAnswer(request: AnswerCommentDto)
  {
    let res = this.commentClient.answer(request);
    return res;
  }

  editComment(request: UpdateCommentDto)
  {
    let res = this.commentClient.commentPut(request);
    return res;
  }

  reportComment(request: CreateReportDto)
  {
    let res = this.reportClient.reportPost(request);
    return res;
  }

  deleteComment(commentId: number)
  {
    let res = this.commentClient.commentDelete(commentId);
    return res;
  }

}
