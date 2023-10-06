import { Injectable } from '@angular/core';
import { State, StateContext, Action } from '@ngxs/store';
import { CommentModel, CommentStateModel } from './comment.model';
import { CommentService } from 'src/app/core/services/comment.service';
import { AddComment, AnswerComment, DeleteComment, EditComment } from './comment.actions';
import { AnswerCommentDto, CommentDetailsDtoBaseResponseDTO, CreateCommentDto, UpdateCommentDto } from 'src/app/core/proxies/mkw-api.proxy';

import {tap} from 'rxjs';

@State<CommentStateModel>({
  name: 'commmentState',
  defaults: {
    comments: []
  }
})

@Injectable()
export class CommentState {

    constructor(private commentService: CommentService){}



    @Action(AddComment)
    AddComment({getState, patchState} : StateContext<CommentStateModel>, {commentText, reviewId} : AddComment)
    {

        let request = new CreateCommentDto();
        request.reviewId = reviewId;
        request.text = commentText;

        return this.commentService.publishComment(request)
        .pipe(
            tap((res: CommentDetailsDtoBaseResponseDTO) =>{
                let response = res.content![0];

                let commentState = getState();

                let newComment: CommentModel = {
                    id: response.id!,
                    commentText: response.text!,
                    commentAuthor: response.person!.username!
                }

                commentState.comments.push(newComment);

                patchState(commentState);
            })
        );
    }

    @Action(EditComment)
    EditComment({getState, patchState} : StateContext<CommentStateModel>, {commentText, commentId} : EditComment)
    {

        let request = new UpdateCommentDto();
        request.commentId = commentId;
        request.text = commentText;

        return this.commentService.editComment(request)
        .pipe(
            tap((res: CommentDetailsDtoBaseResponseDTO) =>{
                let response = res.content![0];

                let commentState = getState();

                commentState.comments.forEach(comment => {
                    if(comment.id == response.id!)
                        comment.commentText = response.text!

                    comment.commentAnswers?.forEach(answer =>{
                        if(answer.id == response.id!)
                            answer.commentText = response.text!
                    })
                });

                patchState(commentState);
            })
        );
    }

    @Action(DeleteComment)
    DeleteComment({getState, patchState} : StateContext<CommentStateModel>, {commentId} : DeleteComment)
    {

        return this.commentService.deleteComment(commentId)
        .pipe(
            tap((res) =>{

                let commentState = getState();

                //Sorry
                commentState.comments = commentState.comments.filter(comment =>{
                    if(comment.id == commentId)
                        return false;

                    if(comment.commentAnswers)
                    {
                        comment.commentAnswers = comment.commentAnswers.filter(answer =>{
                            if(answer.id == commentId)
                                return false;
                            return true;
                        });
                    }
                    return true;
                })

                patchState(commentState);
            })
        );
    }

    @Action(AnswerComment)
    AnswerComment({getState, patchState} : StateContext<CommentStateModel>, {commentId, answerText} : AnswerComment)
    {

        let request = new AnswerCommentDto();
        request.commentId = commentId;
        request.text = answerText;

        return this.commentService.publishAnswer(request)
        .pipe(
            tap((res) =>{

                let response = res.content![0];
                let commentState = getState();

                commentState.comments.forEach(comment =>{
                    if(comment.id == commentId)
                    {
                        if(!comment.commentAnswers)
                             comment.commentAnswers = [];
                        
                        let newAnswer: CommentModel = 
                        {
                            id: response.id!,
                            commentAuthor: response.person!.username!,
                            commentText: response.text!,
                            parentId: commentId
                        };
                        comment.commentAnswers.push(newAnswer);
                    }
                })

                patchState(commentState);
            })
        );
    }
}