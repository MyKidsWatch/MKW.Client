import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ReadProfileDTO, ReadProfileDTOIEnumerableBaseResponseDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ProfileModel } from '../../models/profile.model';
import { AccountUtils } from 'src/app/core/Util/AccountUtil';

@Component({
  selector: 'app-content-reviewer-page',
  templateUrl: './content-reviewer-page.component.html',
  styleUrls: ['./content-reviewer-page.component.scss'],
})
export class ContentReviewerPageComponent  implements OnInit {
  public loading: boolean = false;
  public profile: ProfileModel | undefined;

  public goldenAwards: number = 0;
  public silverAwards: number = 0;
  public bronzeAwards: number = 0;

  public shouldShowAwards: boolean = false;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getProfile();
  }

  getProfile() {
    const username = this.route.snapshot.paramMap.get('username') || '';

    this.profileService.getProfile(username)
      .pipe(take(1))
      .subscribe({
        next: (res: ReadProfileDTOIEnumerableBaseResponseDTO) => {
          const profileDto = res.content![0][0];
          this.profile = this.mapProfile(profileDto);

          this.loading = false;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  mapProfile(profileDto: ReadProfileDTO): ProfileModel 
  {
    return {
      userId: profileDto.userId,
      imageURL: profileDto.imageURL,
      name: profileDto.name,
      username: profileDto.username,
      children: profileDto.childrens?.map(child => {
        return {
          id: child.id,
          ageRangeId: child.ageRangeId,
          ageRange: AccountUtils.getAgeRangeString(child.ageRangeId),
          genderId: child.genderId,
          gender: AccountUtils.getAgeRangeString(child.genderId)
        }
      }),
      goldenAwards: profileDto.awards?.filter(award => award.name == 'gold').length || 0,
      silverAwards: profileDto.awards?.filter(award => award.name == 'silver').length || 0,
      bronzeAwards: profileDto.awards?.filter(award => award.name == 'bronze').length || 0,
      hasAnyAward: this.goldenAwards > 0 || this.silverAwards > 0 || this.bronzeAwards > 0
    }
  }

}
