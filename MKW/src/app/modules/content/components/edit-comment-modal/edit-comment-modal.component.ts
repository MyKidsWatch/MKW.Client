import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-comment-modal',
  templateUrl: './edit-comment-modal.component.html',
  styleUrls: ['./edit-comment-modal.component.scss'],
})
export class EditCommentModalComponent  implements OnInit {
  
  public comment?: string;
  constructor(private modalController: ModalController) {}



  ngOnInit() {}

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalController.dismiss(this.comment, 'edit');
  }


}
