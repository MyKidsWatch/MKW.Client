import { Injectable } from '@angular/core';
import { ProfileClient } from '../proxies/mkw-api.proxy';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private profileClient: ProfileClient) { }

  getProfile = (userName: string) => this.profileClient.profileGet(userName);
}
