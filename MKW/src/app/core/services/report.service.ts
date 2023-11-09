import { Injectable } from '@angular/core';
import { CreateReportDto, CreateReviewDto, PlatformClient, ReportClient, ReviewClient } from '../proxies/mkw-api.proxy';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
  constructor(private reportClient: ReportClient) { 
  }


  report(request: CreateReportDto)
  {
    let res = this.reportClient.reportPost(request);
    return res;
  }


  getReportOptions()
  {
    let res = this.reportClient.reason();
    return res;
  }


  getReportFeed(page: number = 1, size: number = 10, reasonId?: number)
  {
    let res = this.reportClient.reportGet(page, size, reasonId);
    return res;
  }
}
