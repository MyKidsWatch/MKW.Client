import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ReportSelectors } from '../store/report/report.selectors';
import { RespondToCurrentReport, SetIndividualReport, SetReportList } from '../store/report/report.action';


@Injectable({
  providedIn: 'root'
})

export class ReportFacade {
  constructor(private store: Store) { }

  setReportList(pageSize: number = 10,
    pageIndex: number = 1,
    reportReason?: number,
    statusId?: number,
    ascending?: boolean) {
    return this.store.dispatch(new SetReportList(pageSize, pageIndex, reportReason, statusId, ascending));
  }

  setCurrentReport(reportId: number) {
    return this.store.dispatch(new SetIndividualReport(reportId));
  }

  getReportList() {
    return this.store.select(ReportSelectors.GetReportList);
  }

  getCurrentReport() {
    return this.store.select(ReportSelectors.GetCurrentReport);
  }

  getCurrentReportOverview() {
    return this.store.select(ReportSelectors.GetReportOverview);
  }
  getPaginationData() {
    return this.store.select(ReportSelectors.GetPaginationData)
  }

  discardCurrentReport() {
    return this.store.dispatch(new RespondToCurrentReport(3, false, false, false))
  }

  deleteContentFromCurrentReport() {
    return this.store.dispatch(new RespondToCurrentReport(2, true, true, false))
  }

  deleteProfileFromCurrentReport() {
    return this.store.dispatch(new RespondToCurrentReport(2, true, true, true))
  }
}