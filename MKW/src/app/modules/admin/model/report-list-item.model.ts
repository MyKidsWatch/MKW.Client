export interface ReportListItem{
    reportId: number;
    reportAuthor?: string;
    reportStatus?: string;
    reportStatusId?: number;
    reportType?: string;
    reportContentType?: string;
    reportDate?: Date;
    reportPreview?: string;
}