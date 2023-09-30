
export interface ContentCard{
    contentId?: number;
    externalContentId?: string;
    platformId?: number
    title?: string;
    description?: string;
    contentType?: string;
    genre?: string[];
    releaseDate?: Date;
    averageRating?: number;
    picturePath?: string;
}

