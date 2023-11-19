import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/core/services/report.service';
import { ReportFacade } from 'src/app/shared/facades/report.facade';
import { ReportPaginationInformation } from 'src/app/shared/store/report/report.model';

@Component({
  selector: 'app-admin-feed',
  templateUrl: './admin-feed.component.html',
  styleUrls: ['./admin-feed.component.scss'],
})
export class AdminFeedComponent implements OnInit {


  private pageSize: number = 10;
  private pageIndex: number = 1;
  public selectedReportType?: number;
  public isAscending?: boolean = true;
  public selectedReportStatus?: number;
  public paginationData?: ReportPaginationInformation;

  constructor(private reportFacade: ReportFacade) { }

  ngOnInit() {
    this.updateReportList();

    this.reportFacade.getPaginationData().subscribe(res => this.paginationData = res);
  }

  ionViewDidEnter() {
    this.updateReportList();
  }

  updateReportList() {
    this.reportFacade.setReportList(this.pageSize, this.pageIndex, this.selectedReportType, this.selectedReportStatus, !this.isAscending).subscribe(res => { })
  }

  selectReportType(reportType?: number) {
    this.selectedReportType = reportType;
    this.pageIndex = 1;
    this.updateReportList();
  }

  selectReportStatus(reportStatus?: number) {
    this.selectedReportStatus = reportStatus;
    this.pageIndex = 1;
    this.updateReportList();
  }

  selectIsAscending(ascending: boolean) {
    this.isAscending = ascending;
    this.pageIndex = 1;
    this.updateReportList();
  }

  nextPage() {
    this.pageIndex++;
    this.updateReportList();
  }

  previousPage() {
    this.pageIndex--;
    this.updateReportList();
  }
}
