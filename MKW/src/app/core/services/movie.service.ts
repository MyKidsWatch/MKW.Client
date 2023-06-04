import { Injectable } from '@angular/core';
import { MovieClient } from '../proxies/mkw-api.proxy';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private language: string;

  constructor(
    private movieClient: MovieClient,
    private translateService: TranslateService
  ) {
    this.language = this.translateService.currentLang;
  }

  getMovieById(movieId: number) {
    console.log(this.language)
    console.log(this.translateService.currentLoader)
    return this.movieClient.id(movieId, this.language);
  }

  getMovieListByName(movieName: string) {
    return this.movieClient.movie(movieName, this.language);
  }
}
