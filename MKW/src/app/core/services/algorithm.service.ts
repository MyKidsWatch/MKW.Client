import { Injectable } from '@angular/core';
import { AlgorithmClient } from '../proxies/mkw-api.proxy';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {
  private language: string;

  constructor(
    private algorithmClient: AlgorithmClient,
    private translateService: TranslateService
  ) {
    this.language = this.translateService.currentLang;
  }

  getUserFeed(page: number = 1, count: number = 10) {
    return this.algorithmClient.algorithm(page, count, this.language);
  }
}