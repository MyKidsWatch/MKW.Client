import { ReviewAwardInformation, ReviewContentModel, ReviewDetailsModel, ReviewOwnerModel } from "../review/review.model";

export interface UserData {
    userId?: number;
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    username?: string;
    isEmailVerified?: boolean;
    isAdmin?: boolean;
    coinCount?: number;
    childrenInformation: ChildInformation[];
    userReviews: UserReview[];
}


export interface UserReview {
    reviewOwner: ReviewOwnerModel;
    reviewContent: ReviewContentModel;
    reviewDetails: ReviewDetailsModel;
    reviewAwards: ReviewAwardInformation;
    commentCount: number;
}

export interface ChildInformation {
    childId: number;
    ageRangeId: number;
    genderId: number;
}

export interface TokenInfo {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
}