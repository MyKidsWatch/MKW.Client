import { Injectable } from '@angular/core';
import { ProfileClient, UpdateProfilePictureDto } from '../proxies/mkw-api.proxy';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private profileClient: ProfileClient) {
  }

  getProfile = (userName: string) => this.profileClient.search(userName);
  updateProfileImage = (imagePath: string) => {
    let request = new UpdateProfilePictureDto();
    request.imageName = imagePath;
    return this.profileClient.picture(request);
  }
}
