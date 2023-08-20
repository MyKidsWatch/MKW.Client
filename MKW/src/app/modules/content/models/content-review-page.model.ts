
export interface ContentReviewPage{
    reviewId: number;
    reviewTitle?: string;
    reviewDescription?: string;
    reviewRating: number;
    reviewCreationDate: Date;
    reviewAuthor: UserInformation;
    reviewedContentInformation: ContentInformation;
    reviewComments: ContentReviewComment[];
}

export interface ContentInformation{
    contentId: number;
    platformId: number;
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
