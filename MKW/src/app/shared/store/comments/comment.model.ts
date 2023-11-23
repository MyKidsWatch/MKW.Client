

export interface CommentModel {
    personId: number;
    id: number;
    parentId?: number;
    commentText: string;
    commentAuthor: string;
    commentAuthorProfilePictureUrl?: string;
    commentAnswers?: CommentModel[];
    isEdited: boolean;
}



export interface CommentStateModel {

    comments: CommentModel[];
}