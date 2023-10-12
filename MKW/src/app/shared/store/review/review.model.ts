export interface ReviewDetailsModel{
    id?: number;
    title?: string;
    description?: string | null;
    rating?: number;
    creationDate?: Date;
}

export interface ReviewContentModel

{
    contentId?: number;
    platformId?: number;
    externalContentId?: number | string;
    title?: string;
    picturePath?: string;
}

export interface ReviewOwnerModel{
    userName: string;
    profilePictureUrl?: string;
}

export interface ReviewStateModel{
    reviewOwner: ReviewOwnerModel;
    reviewContent: ReviewContentModel;
    reviewDetails: ReviewDetailsModel;
}