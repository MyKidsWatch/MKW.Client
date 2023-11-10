import { Selector } from "@ngxs/store";
import { ReportState } from "./report.state";
import { UserStateModel } from "../user/user.state";
import { ReportListItem } from "src/app/modules/admin/model/report-list-item.model";
import { ReportObject, ReportStateModel } from "./report.model";
import { report } from "process";
import { ReportOverviewInformation } from "src/app/modules/admin/model/report-overview-model";

ReportState
export class ReportSelectors{


    @Selector([ReportState])
    static GetCurrentReport(state: ReportStateModel){
        return state.currentReport;
    }

    @Selector([ReportState])
    static GetReportList(state: ReportStateModel)
    {
        
        let reportListItems: ReportListItem[] = [];

        state.reports.forEach(report =>{

            let reportListItem: ReportListItem = {
                reportId: report.reportId,
                reportDate: report.reportCreationDate,
                reportStatus: report.statusName,
                reportReason: report.reasonName,
                reportType: report.reportType,
                reportAuthor: report.reportProfile!.profileUsername,
                reportStatusId: report.statusId
            }

            reportListItems.push(reportListItem)
        });

        return reportListItems;
    }

    @Selector([ReportState])
    static GetPaginationData(state: ReportStateModel){
        return state.paginationData;
    }


    @Selector([ReportState])
    static GetReportOverview(state: ReportStateModel) : ReportOverviewInformation | undefined
    {
        let currentReport = state.currentReport;

        if(!currentReport)
            return undefined;
    
        let reportOverview: ReportOverviewInformation;

        reportOverview = {
            reportId: currentReport.reportId,
            reportDate: currentReport.reportCreationDate,
            reportedPerson: currentReport.reportProfile!.profileUsername,
            reportReason: currentReport.reasonId,
            reportStatus: currentReport.statusName,
            reportText: this.getReportText(currentReport),
            reportType: currentReport.reportType
        }

        return reportOverview;
    }



    private static getReportText(report: ReportObject) : string
    {
        let reportText = "";

        if(report.reportReview)
            reportText = report.reportReview.reviewText;

            
        if(report.reportComment)
            reportText = report.reportComment.commentText;

        return reportText;
    }



}
