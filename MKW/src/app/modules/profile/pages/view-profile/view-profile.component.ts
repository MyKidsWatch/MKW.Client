import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade } from 'src/app/shared/facades/user.facade';
import { UserData } from 'src/app/shared/store/user/user.model';
import { take, catchError, switchMap, finalize } from 'rxjs'
import { ProfileModel } from 'src/app/modules/content/models/profile.model';
import { ReadProfileDTO, ReadProfileDTOIEnumerableBaseResponseDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { AccountUtils } from 'src/app/core/Util/AccountUtil';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ContentReviewCard } from 'src/app/shared/models/content-review-card.model';
import { KebabMenuItem } from 'src/app/shared/models/kebab-menu-item.model';
import { ModalController } from '@ionic/angular';
import { AddFundsModalComponent } from 'src/app/shared/components/add-funds-modal/add-funds-modal.component';
import { ChildrenCard } from 'src/app/shared/models/children-card.model';
import { AddChildModalComponent } from '../../components/add-child-modal/add-child-modal.component';
import { EditChildModalComponent } from '../../components/edit-child-modal/edit-child-modal.component';
import { ChangeProfilePictureModalComponent } from '../../components/change-profile-picture-modal/change-profile-picture-modal.component';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  public userData?: UserData;
  public profileData?: ProfileModel;

  public childrenCard: ChildrenCard[] = [];

  public coinCount?: number;

  public goldenAwards: number = 0;
  public silverAwards: number = 0;
  public bronzeAwards: number = 0;

  public shouldShowAwards: boolean = false;

  public reviews: ContentReviewCard[] = [];
  public shouldShowReviews: boolean = false;

  public menuItems: KebabMenuItem[] = [
    {
      label: this.translateService.instant('profile.addBalance'),
      callback: () => this.addFunds()
    },
    {
      label: this.translateService.instant('profile.changeProfilePicture'),
      callback: () => this.changeProfilePicture()
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
    private translateService: TranslateService,
    private modalController: ModalController,
    private toastService: ToastService
  ) { }

  handleRefresh(event: any) {

    this.userFacade.updateUserChildren()
      .pipe(switchMap(res => this.userFacade.updateUserReviews()))
      .pipe(switchMap(res => this.userFacade.updateUserInformation()))
      .pipe(finalize(() => {
        event.target.complete();
      })).subscribe(res => {
        event.target.complete();
      });
  }
  ngOnInit() {
    this.userData = this.userFacade.getUserState();

    this.userFacade.getUserCurrentCoinCount().subscribe(res => { this.coinCount = res });

    this.userFacade.getUserReviews().subscribe(res => {
      console.log(res);
    })
    const username = this.userData?.username || '';

    this.profileService.getProfile(username)
      .pipe(take(1))
      .subscribe({
        next: (res: ReadProfileDTOIEnumerableBaseResponseDTO) => {
          const profileDto = res.content![0][0];

          this.profileData = this.mapProfile(profileDto);
        },
        error: (err: any) => {
          console.log(err);
        },
      });

    this.userFacade.getUserReviewsContentCard().subscribe(res => {
      this.reviews = res
    });

    this.userFacade.getUserChildrenCards(this.translateService).subscribe(res => this.childrenCard = res);
    this.userFacade.updateUserReviews().pipe(catchError(res => {
      this.toastService.showError(this.translateService.instant('genericError'));
      return res;
    }));
  }

  async addFunds() {
    let fundsModal = await this.modalController.create({ component: AddFundsModalComponent });

    fundsModal.present()

    let result = await fundsModal.onWillDismiss();
  }

  async changeProfilePicture() {
    let changeProfilePictureModal = await this.modalController.create({
      component: ChangeProfilePictureModalComponent,
      componentProps: {
        currentProfilePicture: this.profileData?.imageURL || null
      }
    });

    changeProfilePictureModal.present();

    let result = await changeProfilePictureModal.onWillDismiss();

    if (result.role === 'cancel')
      return;

    if (result.role === 'save') {
      const image = result.data;

      if (!image) {
        this.toastService.showError(this.translateService.instant('genericError'));
        return;
      }

      this.profileService.updateProfileImage(image)
        .pipe(take(1))
        .subscribe({
          next: (res: any) => {
            this.profileData!.imageURL = image;
            this.toastService.showSuccess(this.translateService.instant('profilePictureUpdated'));
          },
          error: (err: any) => {
            this.toastService.showError(this.translateService.instant('genericError'));
          }
        });
    }
  }

  async addChild() {
    let addChildModal = await this.modalController.create(
      { component: AddChildModalComponent });

    addChildModal.present();

    let result = await addChildModal.onWillDismiss();

    if (result.role === 'cancel')
      return;

    if (result.role === 'add') {
      let { ageRangeId, genderId } = result.data;

      this.userFacade.addChild(genderId, ageRangeId);
    }
  }


  async editChild(childId: number, ageRangeId: number, genderId: number) {

    let editChildModal = await this.modalController.create(
      {
        component: EditChildModalComponent,
        componentProps: {
          ageRange: ageRangeId,
          gender: genderId
        }
      });

    editChildModal.present();

    let result = await editChildModal.onWillDismiss();

    if (result.role === 'delete')
      this.userFacade.removeChild(childId);

    if (result.role === 'update') {
      let { ageRangeId, genderId } = result.data;

      this.userFacade.updateChild(childId, genderId, ageRangeId);
    }
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

  logOffUser() {
    this.userFacade.logOffUser()
      .pipe(take(1))
      .subscribe(res => {
        this.router.navigateByUrl('auth', { replaceUrl: true })
      });
  }
}
