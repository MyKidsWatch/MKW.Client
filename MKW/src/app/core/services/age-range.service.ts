import { Injectable } from '@angular/core';
import { AgeRangeClient } from '../proxies/mkw-api.proxy';

@Injectable({
  providedIn: 'root'
})
export class AgeRangeService {
  constructor(private ageRangeClient: AgeRangeClient) { }

  getAgeRanges() {
    return this.ageRangeClient.ageRange();
  }
}
