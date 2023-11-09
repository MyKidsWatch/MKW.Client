import { Selector } from "@ngxs/store";
import { ReportState } from "./report.state";
import { UserStateModel } from "../user/user.state";
import { ReportListItem } from "src/app/modules/admin/model/report-list-item.model";
import { ReportStateModel } from "./report.model";
import { report } from "process";

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
                reportDate: new Date(),
                reportStatus: report.statusName,
                reportReason: report.reasonName,
                reportType: report.reportType,
                reportAuthor: "Eren Yeagar",
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
    static GetReportListViewModel(){}



}
