export interface ReportObject
{
    reportId: number; 
    statusId: number;
    reasonId: number;
    reportType: string;
}

export interface ReportPaginationInformation{
    currentPage: number;
    pageCount: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface ReportStateModel{
    reports: ReportObject[];
    paginationData: ReportPaginationInformation;
}