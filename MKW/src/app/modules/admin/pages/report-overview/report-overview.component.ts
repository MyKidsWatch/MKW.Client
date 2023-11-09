import { Component, OnInit } from '@angular/core';
import { ReportFacade } from 'src/app/shared/facades/report.facade';
import { ReportObject } from 'src/app/shared/store/report/report.model';

@Component({
  selector: 'app-report-overview',
  templateUrl: './report-overview.component.html',
  styleUrls: ['./report-overview.component.scss'],
})
export class ReportOverviewComponent  implements OnInit {


  public reportObject?: ReportObject;
  constructor(private reportFacade: ReportFacade) { }

  ngOnInit() {

    this.reportFacade.getCurrentReport()
    .subscribe(res => this.reportObject = res);
  }



}
