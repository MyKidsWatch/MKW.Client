import { Component, OnInit } from '@angular/core';
import { ReportListItem } from '../../model/report-list-item.model';
import { ReportFacade } from 'src/app/shared/facades/report.facade';
import { ReportPaginationInformation } from 'src/app/shared/store/report/report.model';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent  implements OnInit {


  public reportList: ReportListItem[] = [];
  constructor(private reportFacade: ReportFacade) { }

  ngOnInit() {

    this.reportFacade.getReportList().subscribe(res => this.reportList = res)
  }

}
