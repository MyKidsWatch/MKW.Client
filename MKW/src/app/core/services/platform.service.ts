import { Injectable } from '@angular/core';
import { PlatformClient } from '../proxies/mkw-api.proxy';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private platformClient: PlatformClient) { }

  getPlatform()
  {
    return this.platformClient.platform();
  }
}
