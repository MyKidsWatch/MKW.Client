import { Selector } from "@ngxs/store";
import { UserState } from "../user/user.state";
import { CommentState } from "./comment.state";
import { CommentStateModel } from "./comment.model";
import { ContentReviewComment } from "src/app/modules/content/models/content-review-page.model";



export class CommentSelectors {

    @Selector([CommentState])
    static GetComments(state: CommentStateModel) {
        return state;
    }

    @Selector([CommentState])
    static GetCommentCardModel(state: CommentStateModel): ContentReviewComment[] {

        let contentReviewComments: ContentReviewComment[] = [];

        state.comments.forEach(comment => {

            let contentReviewComment: ContentReviewComment = {
                commentAuthor: {
                    creatorId: comment.personId,
                    userName: comment.commentAuthor,
                    profilePictureUrl: comment.commentAuthorProfilePictureUrl
                },
                commentId: comment.id,
                commentText: comment.commentText,
                commentResponses: [],
                commentIsEdited: comment.isEdited
            }

            comment.commentAnswers?.forEach(answer => {
                let commentAnswer: ContentReviewComment = {
                    commentAuthor: {
                        creatorId: comment.personId,
                        userName: answer.commentAuthor,
                        profilePictureUrl: answer.commentAuthorProfilePictureUrl
                    },
                    commentId: answer.id,
                    commentText: answer.commentText,
                    commentResponses: [],
                    parentCommentId: answer.parentId,
                    commentIsEdited: comment.isEdited
                }
                contentReviewComment.commentResponses!.push(commentAnswer)
            });

            contentReviewComments.push(contentReviewComment);
        });


        return contentReviewComments;
    }
}