import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ReadProfileDTO, ReadProfileDTOIEnumerableBaseResponseDTO, ReviewDetailsDto, ReviewDetailsDtoBaseResponseDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ReviewService } from 'src/app/core/services/review.service';
import { ProfileModel } from '../../models/profile.model';
import { AccountUtils } from 'src/app/core/Util/AccountUtil';
import { ContentReviewCard } from 'src/app/shared/models/content-review-card.model';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';

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

  public reviews: ContentReviewCard[] = [];
  public shouldShowReviews: boolean = false;

  constructor(
    private profileService: ProfileService,
    private reviewService: ReviewService,
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
          
          if (this.profile?.userId) {
            this.getUserReviews(this.profile.userId);
            console.log(this.reviews)
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

  mapProfile = (profileDto: ReadProfileDTO): ProfileModel => ({
    userId: profileDto.userId,
    imageURL: profileDto.imageURL,
    name: profileDto.name,
    username: profileDto.username,
    children: profileDto.childrens?.map(child => ({
      id: child.id,
      ageRangeId: child.ageRangeId,
      ageRange: AccountUtils.getAgeRangeString(child.ageRangeId),
      genderId: child.genderId,
      gender: AccountUtils.getAgeRangeString(child.genderId)
    })),
    goldenAwards: profileDto.awards?.filter(award => award.name == 'gold').length || 0,
    silverAwards: profileDto.awards?.filter(award => award.name == 'silver').length || 0,
    bronzeAwards: profileDto.awards?.filter(award => award.name == 'bronze').length || 0,
    hasAnyAward: this.goldenAwards > 0 || this.silverAwards > 0 || this.bronzeAwards > 0
  })

  mapReview = (response: ReviewDetailsDto) => ContentUtils.relevantReviewToContentReviewCard(response);

}
