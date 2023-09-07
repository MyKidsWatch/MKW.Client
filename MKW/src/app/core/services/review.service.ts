import { Injectable } from '@angular/core';
import { PlatformClient, ReviewClient } from '../proxies/mkw-api.proxy';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private language: string;

  
  constructor(private reviewClient: ReviewClient, private translateService: TranslateService) { 
    this.language = this.translateService.currentLang;
  }

  getRelevantReviews(page: number = 1, count: number = 10) {
    return this.reviewClient.reviewGet(page, count, this.language);
  }
}
