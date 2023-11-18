import { Injectable } from "@angular/core";
import { ReportObject, ReportStateModel, ReportType } from "./report.model";
import { State, StateContext, Action } from '@ngxs/store';
import { ReportService } from "src/app/core/services/report.service";
import { RespondToCurrentReport, SetIndividualReport, SetReportList } from "./report.action";
import { take, tap } from "rxjs";
import { IReportResponseDto, ReportResponseDto } from "src/app/core/proxies/mkw-api.proxy";
import { stat } from "fs";




const defaultState: ReportStateModel = {
    reports: []
};

@State<ReportStateModel>({
    name: 'reportState',
    defaults: defaultState
})

@Injectable()
export class ReportState {

    constructor(private reportService: ReportService) { }

    @Action(SetReportList)
    SetReportList({ getState, patchState }: StateContext<ReportStateModel>, { pageIndex, pageSize, reportReason, ascending, statusId }: SetReportList) {

        return this.reportService.getReportFeed(pageIndex, pageSize, reportReason, statusId, ascending)
            .pipe(take(1))
            .pipe(tap(res => {

                let reportListState = getState().reports;

                let reportList = res.pagedContent!.results;
                reportListState = [];
                reportList?.forEach(report => {
                    let reportObject: ReportObject = {
                        reasonId: report.reasonId!,
                        reportId: report.reportId!,
                        reportType: report.reportType!,
                        statusId: report.status!.statusId!,
                        statusName: report.status!.name!,
                        reasonName: report.reason!.title!,
                        reportCreationDate: report.createDate!

                    }

                    if (report.review) {
                        reportObject.reportReview = {
                            reviewAuthor: report.review!.user!.username!,
                            reviewId: report.review!.id!,
                            reviewText: report.review.text!
                        }
                    }

                    if (report.comment) {
                        reportObject.reportComment = {
                            commentAuthor: report.comment!.person!.username!,
                            commentText: report.comment!.text!,
                            commentId: report.comment!.id!
                        }
                    }


                    if (report.reportedPerson) {
                        reportObject.reportProfile = {
                            profileId: report.reportedPerson!.id!,
                            profileUsername: report.reportedPerson!.username!
                        }
                    }
                    reportListState.push(reportObject);
                });

                patchState({
                    reports: reportListState,
                    paginationData: {
                        currentPage: res.pagedContent!.page!,
                        hasNextPage: res.pagedContent!.hasNextPage!,
                        hasPrevPage: res.pagedContent!.hasPreviousPage!,
                        pageCount: res.pagedContent!.pageCount!,
                        pageSize: res.pagedContent!.pageSize!
                    }
                });
            }));

    }

    @Action(SetIndividualReport)
    SetIndividualReport({ getState, patchState }: StateContext<ReportStateModel>, { reportId }: SetIndividualReport) {
        let reviewListState = getState().reports;
        let review = reviewListState.find(x => x.reportId == reportId);
        return patchState({ currentReport: review });
    }

    @Action(RespondToCurrentReport)
    RespondToReport({ getState, patchState }: StateContext<ReportStateModel>, { deleteComment, deleteProfile, deleteReview, statusId }: RespondToCurrentReport) {

        let currentReport = getState().currentReport!;

        let requestData: IReportResponseDto = {
            statusId: statusId,
            closeReport: false,
            deleteComment: deleteComment,
            deletePerson: deleteProfile,
            deleteReview: deleteReview,
            reportId: currentReport.reportId
        }

        let request: ReportResponseDto = new ReportResponseDto(requestData);
        return this.reportService.respondToReport(request)
            .pipe(take(1))
            .pipe(tap(res => {

                patchState({
                    currentReport: undefined
                })
            }));
    }
}