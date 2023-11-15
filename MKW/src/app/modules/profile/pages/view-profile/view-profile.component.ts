import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade } from 'src/app/shared/facades/user.facade';
import { UserData } from 'src/app/shared/store/user/user.model';
import { take } from 'rxjs'
import { ProfileModel } from 'src/app/modules/content/models/profile.model';
import { ReadProfileDTO, ReadProfileDTOIEnumerableBaseResponseDTO, ReviewDetailsDto } from 'src/app/core/proxies/mkw-api.proxy';
import { AccountUtils } from 'src/app/core/Util/AccountUtil';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ContentReviewCard } from 'src/app/shared/models/content-review-card.model';
import { KebabMenuItem } from 'src/app/shared/models/kebab-menu-item.model';
import { ReviewService } from 'src/app/core/services/review.service';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent  implements OnInit {
  public userData?: UserData;
  public profileData?: ProfileModel;
  public coinCount?: number;

  public goldenAwards: number = 0;
  public silverAwards: number = 0;
  public bronzeAwards: number = 0;

  public shouldShowAwards: boolean = false;

  public reviews: ContentReviewCard[] = [];
  public shouldShowReviews: boolean = false;

  public menuItems: KebabMenuItem[] = [
    {
      label: this.translateService.instant('profile.editChildren'),
      callback: () => this.router.navigate(['home/profile/children'])
    },
    {
      label: this.translateService.instant('profile.addBalance'),
      callback: () => console.log('add balance')
    },
    {
      label: this.translateService.instant('profile.logout'),
      callback: () => this.logOffUser(),
    },
  ];

  constructor(
    private userFacade: UserFacade, 
    private router: Router,
    private profileService: ProfileService,
    private reviewService: ReviewService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.userData = this.userFacade.getUserState();

    this.userFacade.getUserCurrentCoinCount()
    .subscribe(res => {
      console.log(res)
      this.coinCount = res
    });

    const username = this.userData?.username || '';

    this.profileService.getProfile(username)
      .pipe(take(1))
      .subscribe({
        next: (res: ReadProfileDTOIEnumerableBaseResponseDTO) => {
          const profileDto = res.content![0][0];

          this.profileData = this.mapProfile(profileDto);
          
          if (this.profileData?.userId) {
            this.getUserReviews(this.profileData.userId);
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  getUserReviews(userId: number) {
    this.reviewService.getReviewByUserId(userId)
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          this.reviews = res.content?.map((review: ReviewDetailsDto) => this.mapReview(review)) || [];

          if (this.reviews?.length > 0) {
            this.shouldShowReviews = true;
          } 
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  mapReview = (response: ReviewDetailsDto) => ContentUtils.relevantReviewToContentReviewCard(response);

  mapProfile = (profileDto: ReadProfileDTO): ProfileModel => {
    const children = profileDto.childrens?.map(child => ({
      id: child.id,
      ageRangeId: child.ageRangeId,
      ageRange: AccountUtils.getAgeRangeString(child.ageRangeId, this.translateService),
      genderId: child.genderId,
      gender: AccountUtils.getGenderString(child.genderId) || '',
    }));
  
    const awards = profileDto.awards || [];
    const goldenAwards = awards.filter(award => award.name?.toLowerCase() === 'gold')[0]?.quantity || 0;
    const silverAwards = awards.filter(award => award.name?.toLowerCase() === 'silver')[0]?.quantity || 0;
    const bronzeAwards = awards.filter(award => award.name?.toLowerCase() === 'bronze')[0]?.quantity || 0;
    const hasAnyAward = goldenAwards > 0 || silverAwards > 0 || bronzeAwards > 0;
  
    this.shouldShowAwards = hasAnyAward;
    this.goldenAwards = goldenAwards;
    this.silverAwards = silverAwards;
    this.bronzeAwards = bronzeAwards;

    return {
      personId: profileDto.personId,
      userId: profileDto.userId,
      imageURL: profileDto.imageURL,
      name: profileDto.name,
      username: profileDto.username,
      children,
      goldenAwards,
      silverAwards,
      bronzeAwards,
      hasAnyAward,
    };
  }

  logOffUser() {
    this.userFacade.logOffUser()
      .pipe(take(1))
      .subscribe(res =>{
        this.router.navigateByUrl('auth', {replaceUrl: true})
      });
  }
}
