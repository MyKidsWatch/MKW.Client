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
}
