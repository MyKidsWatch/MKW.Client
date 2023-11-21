import { Component, OnInit } from '@angular/core';
import { ReportFacade } from 'src/app/shared/facades/report.facade';
import { ReportOverviewInformation } from '../../model/report-overview-model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-report-overview',
  templateUrl: './report-overview.component.html',
  styleUrls: ['./report-overview.component.scss'],
})
export class ReportOverviewComponent implements OnInit {
  public reportOverview?: ReportOverviewInformation;

  constructor(
    private reportFacade: ReportFacade,
    private router: Router,
    private translateService: TranslateService,
    private toastService: ToastService
  ) {   }

  ngOnInit() {
    this.reportFacade.getCurrentReportOverview().subscribe((res) => (this.reportOverview = res));
  }

  goBack() {
    this.router.navigate([`home/admin/admin-feed`]);
  }

  discardReport() {
    this.reportFacade.discardCurrentReport().subscribe((res) => {
      this.goBack();
      this.toastService.showError(this.translateService.instant('reportDiscardedSuccessfully'));
    });
  }

  removeProfile() {
    this.reportFacade.deleteProfileFromCurrentReport().subscribe((res) => {
      this.goBack();
      this.toastService.showError(this.translateService.instant('profileDeletedSuccessfully'));
    });
  }

  removeContent() {
    this.reportFacade.deleteContentFromCurrentReport().subscribe((res) => {
      this.goBack();
      this.toastService.showError(this.translateService.instant('contentDeletedSuccessfully'));
    });
  }
}
