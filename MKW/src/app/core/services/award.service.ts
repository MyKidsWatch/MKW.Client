import { Injectable } from '@angular/core';
import { AwardClient, CreateReviewDto, GiveAwardDto, PlatformClient, ReviewClient, UpdateReviewDto } from '../proxies/mkw-api.proxy';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AwardService {
  private language: string;

  constructor(private awardClient: AwardClient, private translateService: TranslateService) {
    this.language = this.translateService.currentLang;
  }

  giveReviewAward(request: GiveAwardDto) {
    let res = this.awardClient.awardPost(request);
    return res;
  }

}
