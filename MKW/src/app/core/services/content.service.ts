import { Injectable } from '@angular/core';
import { ContentClient, MovieClient, PlatformEnum } from '../proxies/mkw-api.proxy';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private language: string;

  constructor(
    private contentClient: ContentClient,
    private translateService: TranslateService
  ) {
    this.language = this.translateService.currentLang;
  }

  getContentById(contentId: number) {
    return this.contentClient.id(contentId, this.language);
  }

  getContentByExternalId(contentId: string, platformId: PlatformEnum) {
    return this.contentClient.external(contentId, platformId, this.language);
  }

  searchContentByName(contentName: string, platformId: PlatformEnum | undefined) 
  {
    let response = this.contentClient.content(contentName, platformId, this.language);
    
    return response;
  }
}
