import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-change-profile-picture-modal',
  templateUrl: './change-profile-picture-modal.component.html',
  styleUrls: ['./change-profile-picture-modal.component.scss'],
})
export class ChangeProfilePictureModalComponent  implements OnInit {
  @Input() currentProfilePicture: string | null = null;

  public profilePictures: string[] = [
    "assets/icon/default.jpg",
    "assets/images/preset-profile-pictures/propic01.png",
    "assets/images/preset-profile-pictures/propic02.png",
    "assets/images/preset-profile-pictures/propic03.png",
    "assets/images/preset-profile-pictures/propic04.png",
    "assets/images/preset-profile-pictures/propic05.png",
    "assets/images/preset-profile-pictures/propic06.png",
    "assets/images/preset-profile-pictures/propic07.png",
    "assets/images/preset-profile-pictures/propic08.png",
    "assets/images/preset-profile-pictures/propic09.png",
  ];	

  public selectedProfilePicture: string | null = null;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.selectedProfilePicture = this.profilePictures.filter(picture => picture === this.currentProfilePicture)[0] || this.profilePictures[0];
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  selectProfilePicture(imagePath: string | null) {
    this.selectedProfilePicture = imagePath;
  }

  saveProfilePictureChanges() {
    this.modalController.dismiss(this.selectedProfilePicture, 'save');
  }
}
