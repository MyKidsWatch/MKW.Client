export enum ReportType{
    Comment, 
    Review,
    Profile
}

export interface ReportObject
{
    reportId: number; 
    statusId: number;
    statusName: string;
    reasonId: number;
    reportType: ReportType;
    commentId?: number;
    reviewId?: number;
    profileId?: number;
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