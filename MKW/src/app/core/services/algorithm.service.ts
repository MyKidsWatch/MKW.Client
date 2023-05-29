import { Injectable } from '@angular/core';
import { AlgorithmClient } from '../proxies/mkw-api.proxy';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  constructor(private algorithmClient: AlgorithmClient) { }

  getUserFeed(page: number = 1, count: number = 10)
  {
      return this.algorithmClient.algorithm(page, count, undefined);
  }
}
