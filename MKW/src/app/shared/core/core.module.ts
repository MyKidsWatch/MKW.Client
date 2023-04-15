import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieClient, PlatformClient } from './proxies/mkw-api.proxy';
import { MovieService } from './services/movie.service';
import { InjectionToken } from '@angular/core';

const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    MovieClient,
    PlatformClient 
  ]
})
export class CoreModule { }
