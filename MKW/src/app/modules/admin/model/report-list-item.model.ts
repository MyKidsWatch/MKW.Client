export interface ReportListItem{
    reportId: number;
    reportAuthor?: string;
    reportStatus?: string;
    reportStatusId?: number;
    reportType?: string;
    reportReason?: string;
    reportDate?: Date;
    reportPreview?: string;
}