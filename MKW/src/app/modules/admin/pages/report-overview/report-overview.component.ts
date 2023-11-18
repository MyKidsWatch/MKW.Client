import { Component, OnInit } from '@angular/core';
import { ReportFacade } from 'src/app/shared/facades/report.facade';
import { ReportObject } from 'src/app/shared/store/report/report.model';
import { ReportOverviewInformation } from '../../model/report-overview-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-overview',
  templateUrl: './report-overview.component.html',
  styleUrls: ['./report-overview.component.scss'],
})
export class ReportOverviewComponent implements OnInit {


  public reportOverview?: ReportOverviewInformation;
  constructor(private reportFacade: ReportFacade, private router: Router) { }

  ngOnInit() {

    this.reportFacade.getCurrentReportOverview()
      .subscribe(res => this.reportOverview = res);
  }


  goBack() {
    this.router.navigate([`home/admin/admin-feed`]);

  }

  discardReport() {
    this.reportFacade.discardCurrentReport()
      .subscribe(res => {
        this.goBack();
        alert("Report descartado com sucesso!")
      });
  }

  removeProfile() {

    this.reportFacade.deleteProfileFromCurrentReport()
      .subscribe(res => {
        this.goBack();
        alert("Perfil deletado com sucesso!")
      });
  }

  removeContent() {
    this.reportFacade.deleteContentFromCurrentReport()
      .subscribe(res => {
        this.goBack();
        alert("Conteúdo deletado com sucesso!")
      });
  }

}
