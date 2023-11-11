
export interface ContentReviewPage {
    reviewId: number;
    reviewTitle: string;
    reviewDescription?: string | null;
    reviewRating: number;
    reviewCreationDate: Date;
    reviewAuthor: UserInformation;
    reviewAwardInformation: ReviewAwardInformation;
    reviewedContentInformation: ContentInformation;
}

export interface ReviewAwardInformation {
    goldenAwardCount: number;
    silverAwardCount: number;
    bronzeAwardCount: number;
}

export interface ContentInformation {
    contentId: number;
    platformId: number;
    externalContentId: number | string;
    title: string;
    picturePath?: string;
}

export interface UserInformation {
    creatorId: number;
    userName: string;
    profilePictureUrl?: string;
}

export interface ContentReviewComment {
    commentId: number;
    parentCommentId?: number;
    commentText: string;
    commentAuthor: UserInformation;
    commentResponses: ContentReviewComment[];
}
