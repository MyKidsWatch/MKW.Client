import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommentClient, MovieClient, PlatformClient } from './proxies/mkw-api.proxy';
import { InjectionToken } from '@angular/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SplashScreenService } from './services/splash-screen.service';

const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot(
      {
        defaultLanguage: navigator.language ?? 'en-US',
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
          deps: [HttpClient]
        }
      }
    )
  ],
  providers: [
    MovieClient,
    PlatformClient,
    SplashScreenService
  ]
})
export class CoreModule { }
