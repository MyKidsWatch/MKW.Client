import { Injectable } from '@angular/core';
import { CreateReviewDto, PlatformClient, ReviewClient } from '../proxies/mkw-api.proxy';
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

  registerReview(createReviewDTO: CreateReviewDto) {
    return this.reviewClient.reviewPost(createReviewDTO);
  }

  getReviewById(id: number, language: string = "pt-br" ) {
    return this.reviewClient.id(id, language);
  }

  getReviewByUserId(userId: number, language: string = "pt-br") {
    return this.reviewClient.getByUserId(userId, language);
  }
}
