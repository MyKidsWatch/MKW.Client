import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-funds-modal',
  templateUrl: './add-funds-modal.component.html',
  styleUrls: ['./add-funds-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule, RouterModule]
})
export class AddFundsModalComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  cancel() {
    this.modalController.dismiss(null, 'cancel')
  }
}
