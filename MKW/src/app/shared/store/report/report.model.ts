export enum ReportType{
    Comment, 
    Review,
    Profile
}


export interface ReportComment{
    commentText: string;
    commentId: number;
    commentAuthor: string;
}

export interface ReportReview{
    reviewText: string;
    reviewId: number;
    reviewAuthor: string;
}

export interface ReportProfile{
    profileId: number;
    profileUsername: string;
}

export interface ReportObject
{
    reportId: number; 
    statusId: number;
    reasonId: number;
    reportCreationDate: Date;

    reportComment?: ReportComment;
    reportReview?: ReportReview;
    reportProfile?: ReportProfile;

    reasonName: string;
    reportType: string;
    statusName: string;
    reportAuthor?: string;

}

export interface ReportPaginationInformation{
    currentPage: number;
    pageCount: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface ReportSearchOptions{
    preferedReason?: number;
    pageSize: number;


}


export interface ReportStateModel{
    reports: ReportObject[];
    currentReport?: ReportObject;
    paginationData?: ReportPaginationInformation;
}