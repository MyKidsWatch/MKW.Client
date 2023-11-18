export interface ReviewDetailsModel {
    id?: number;
    title?: string;
    description?: string | null;
    rating?: number;
    creationDate?: Date;
    isEdited?: boolean;
}

export interface ReviewContentModel {
    contentId?: number;
    platformId?: number;
    externalContentId?: number | string;
    title?: string;
    picturePath?: string;
}

export interface ReviewOwnerModel {
    id: number;
    userName: string;
    profilePictureUrl?: string;
}

export interface ReviewAwardInformation {
    goldenAwards: number;
    silverAwards: number;
    bronzeAwards: number;
}
export interface ReviewStateModel {
    reviewOwner: ReviewOwnerModel;
    reviewContent: ReviewContentModel;
    reviewDetails: ReviewDetailsModel;
    reviewAwards: ReviewAwardInformation;
}