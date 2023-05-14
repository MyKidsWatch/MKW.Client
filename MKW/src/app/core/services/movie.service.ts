import { Injectable } from '@angular/core';
import { MovieClient } from '../proxies/mkw-api.proxy';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private movieClient: MovieClient) { }

  getMovie(movieId: number)
  {
    return this.movieClient.movie(movieId);
  }
}
