import { Component, OnInit } from '@angular/core';
import { ReportFacade } from 'src/app/shared/facades/report.facade';
import { ReportObject } from 'src/app/shared/store/report/report.model';
import { ReportOverviewInformation } from '../../model/report-overview-model';

@Component({
  selector: 'app-report-overview',
  templateUrl: './report-overview.component.html',
  styleUrls: ['./report-overview.component.scss'],
})
export class ReportOverviewComponent  implements OnInit {


  public reportOverview?: ReportOverviewInformation;
  constructor(private reportFacade: ReportFacade) { }

  ngOnInit() {

    this.reportFacade.getCurrentReportOverview()
    .subscribe(res => this.reportOverview = res);
  }



}
