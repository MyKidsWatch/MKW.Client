import { Injectable } from '@angular/core';
import { CreateReportDto, CreateReviewDto, PlatformClient, ReportClient, ReportResponseDto, ReviewClient } from '../proxies/mkw-api.proxy';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private reportClient: ReportClient) {
  }


  report(request: CreateReportDto) {
    let res = this.reportClient.reportPost(request);
    return res;
  }

  getReportOptions() {
    let res = this.reportClient.reason();
    return res;
  }


  getReportFeed(page: number = 1, size: number = 10, reasonId?: number, statusId?: number, orderByAscending?: boolean) {
    let res = this.reportClient.reportGet(page, size, reasonId, statusId, "CreateDate", orderByAscending);
    return res;
  }


  respondToReport(request: ReportResponseDto) {
    let res = this.reportClient.response(request);
    return res;
  }
}
