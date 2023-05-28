import { Injectable } from '@angular/core';
import { MovieClient } from '../proxies/mkw-api.proxy';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private movieClient: MovieClient) { }

  getMovieById(movieId: number, cultureCode: string = 'pt-BR')
  {
    return this.movieClient.id(movieId, cultureCode);
  }

  getMovieListByName(movieName: string, cultureCode: string = 'pt-BR')
  {
    return this.movieClient.movie(movieName, cultureCode);
  }
}
