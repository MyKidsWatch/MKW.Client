
export interface ContentReviewCard{
    reviewId?: number;
    reviewTitle?: string | null;
    reviewBody?: string | null;
    reviewRating?: number;
    reviewCommentCount: number;
    reviewPublishDate: Date;
    reviewContentInformation: ContentInformation;
    reviewerInformation: ContentReviewer;
    reviewAwardInformation: ContentReviewAwardInformation;
}

export interface ContentInformation{
    contentTitle: string;
    contentPosterPath?: string;
}

export interface ContentReviewAwardInformation{
    reviewGoldAwardCount: number;
    reviewSilverAwardCount: number;
    reviewBronzeAwardCount: number;
}

export interface ContentReviewer{
    reviewerId: number;
    reviewerName: string;
    reviewerPicturePath: string;
}