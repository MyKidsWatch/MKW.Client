import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    this.userFacade.getUserCurrentCoinCount()
      .subscribe(res => this.userBalance = res);
  }


  selectAward(awardId: number) {
    this.selectedAwardId = awardId;
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel')
  }

  confirm() {
    this.modalController.dismiss(this.selectedAwardId, 'award');
  }
}
