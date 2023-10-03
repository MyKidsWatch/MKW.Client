import { Injectable } from '@angular/core';
import { AnswerCommentDto, CommentClient, CommentDetailsDtoBaseResponseDTO, CreateCommentDto } from '../proxies/mkw-api.proxy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private commentClient: CommentClient) { }

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

}
