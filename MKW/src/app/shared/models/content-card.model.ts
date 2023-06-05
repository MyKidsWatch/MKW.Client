
export interface ContentCard{
    id: number;
    title: string;
    description: string;
    contentType: string;
    genre: string[];
    releaseDate: Date;
    averageRating: number;
    picturePath?: string;
}