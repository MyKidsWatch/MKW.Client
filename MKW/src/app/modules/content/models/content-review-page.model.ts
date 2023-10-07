
export interface ContentReviewPage{
    reviewId: number;
    reviewTitle?: string;
    reviewDescription?: string | null;
    reviewRating?: number;
    reviewCreationDate: Date;
    reviewAuthor: UserInformation;
    reviewedContentInformation: ContentInformation;
}

export interface ContentInformation{
    contentId: number;
    platformId: number;
    externalContentId: number | string;
    title: string;
    picturePath?: string;
}

export interface UserInformation{
    userName: string;
    profilePictureUrl?: string;
}

export interface ContentReviewComment{
    commentId: number;
    parentCommentId?: number;
    commentText: string;
    commentAuthor: UserInformation;
    commentResponses: ContentReviewComment[];
}
