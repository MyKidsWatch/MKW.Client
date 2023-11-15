import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddFundsModalComponent } from 'src/app/shared/components/add-funds-modal/add-funds-modal.component';
import { UserFacade } from 'src/app/shared/facades/user.facade';

@Component({
  selector: 'app-award-review-modal',
  templateUrl: './award-review-modal.component.html',
  styleUrls: ['./award-review-modal.component.scss'],
})
export class AwardReviewModalComponent implements OnInit {

  constructor(private modalController: ModalController, private userFacade: UserFacade) { }

  public userBalance?: number;
  public selectedAwardId?: number;

  ngOnInit() {
    this.userFacade.updateUserInformation();
    this.userFacade.getUserCurrentCoinCount()
      .subscribe(res => this.userBalance = res);
  }


  selectAward(awardId: number, awardCost: number) {
    if (this.userBalance && this.userBalance < awardCost)
      return;

    this.selectedAwardId = awardId;
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel')
  }

  confirm() {
    this.modalController.dismiss(this.selectedAwardId, 'award');
  }

  async addFunds() {
    let fundsModal = await this.modalController.create({ component: AddFundsModalComponent });

    fundsModal.present()

    let result = await fundsModal.onWillDismiss();
  }

  getAwardCardClass(awardId: number, awardCost: number) {

    if (awardId == this.selectedAwardId)
      return 'selected'

    if (!this.userBalance || this.userBalance < awardCost)
      return 'unavailable'

    return '';
  }
}
