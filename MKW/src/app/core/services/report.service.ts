import { Injectable } from '@angular/core';
import { CreateReportDto, ReportClient, ReportResponseDto } from '../proxies/mkw-api.proxy';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private reportClient: ReportClient,
    private translateService: TranslateService,
  ) { }

  report(request: CreateReportDto) {
    let res = this.reportClient.reportPost(request);
    return res;
  }

  getReportOptions() {
    let res = this.reportClient.reason(this.translateService.currentLang);
    return res;
  }


  getReportFeed(page: number = 1, size: number = 10, reasonId?: number, statusId?: number, orderByAscending?: boolean) {
    let res = this.reportClient.reportGet(page, size, reasonId, statusId, "CreateDate", orderByAscending, this.translateService.currentLang);
    return res;
  }


  respondToReport(request: ReportResponseDto) {
    let res = this.reportClient.response(request);
    return res;
  }
}
