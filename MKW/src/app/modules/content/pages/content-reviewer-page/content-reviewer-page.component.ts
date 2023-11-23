import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { CreateReportDto, ReadProfileDTO, ReadProfileDTOIEnumerableBaseResponseDTO, ReviewDetailsDto } from 'src/app/core/proxies/mkw-api.proxy';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ReviewService } from 'src/app/core/services/review.service';
import { ReportService } from 'src/app/core/services/report.service';
import { TranslateService } from '@ngx-translate/core';
import { ProfileModel } from '../../models/profile.model';
import { AccountUtils } from 'src/app/core/Util/AccountUtil';
import { ContentReviewCard } from 'src/app/shared/models/content-review-card.model';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { KebabMenuItem } from 'src/app/shared/models/kebab-menu-item.model';
import { ModalController } from '@ionic/angular';
import { ReportProfileModalComponent } from '../../components/report-profile-modal/report-profile-modal.component';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-content-reviewer-page',
  templateUrl: './content-reviewer-page.component.html',
  styleUrls: ['./content-reviewer-page.component.scss'],
})
export class ContentReviewerPageComponent implements OnInit {
  public loading: boolean = false;
  public profile: ProfileModel | undefined;

  public goldenAwards: number = 0;
  public silverAwards: number = 0;
  public bronzeAwards: number = 0;

  public shouldShowAwards: boolean = false;

  public reviews: ContentReviewCard[] = [];
  public shouldShowReviews: boolean = false;

  public menuItems: KebabMenuItem[] = [
    {
      label: 'Denunciar perfil',
      callback: () => this.openReportModal(),
    },
  ];

  constructor(
    private profileService: ProfileService,
    private reviewService: ReviewService,
    private reportService: ReportService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private translateService: TranslateService,
    private toastService: ToastService
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

  mapReview = (response: ReviewDetailsDto) => ContentUtils.relevantReviewToContentReviewCard(response);

  async openReportModal() {
    const modal = await this.modalController.create({component: ReportProfileModalComponent})

    modal.present();

    const result = await modal.onWillDismiss();
  
    if(result.data === null || result.role != 'report')
      return;

    const request = new CreateReportDto();
    request.reportedPersonId = this.profile?.personId;
    request.reasonId = result.data;

    console.log(request);

    this.reportService.report(request)
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          this.toastService.showSuccess(this.translateService.instant('reportSuccess'));
        },
        error: (err: any) => {
          this.toastService.showError(this.translateService.instant('genericError'));
        },
      });
  }
}
