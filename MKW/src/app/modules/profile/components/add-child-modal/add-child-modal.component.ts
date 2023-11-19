import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateChildDto } from 'src/app/core/proxies/mkw-api.proxy';
import { ChildService } from 'src/app/core/services/child.service';
import { AgeRangeService } from 'src/app/core/services/age-range.service';
import { Location } from '@angular/common';
import { take } from 'rxjs';
import { UserFacade } from 'src/app/shared/facades/user.facade';
import { AgeRangeData } from '../../model/age-range.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-child-modal',
  templateUrl: './add-child-modal.component.html',
  styleUrls: ['./add-child-modal.component.scss'],
})
export class AddChildModalComponent implements OnInit {

  public ageRanges: AgeRangeData[] = [
    { id: 1, initialAge: 0, finalAge: 2 },
    { id: 2, initialAge: 3, finalAge: 5 },
    { id: 3, initialAge: 6, finalAge: 8 },
    { id: 4, initialAge: 9, finalAge: 11 },
    { id: 5, initialAge: 12, finalAge: 14 },
    { id: 6, initialAge: 15, finalAge: 17 }

  ];

  registrationForm: FormGroup = this.formBuilder.group({
    gender: ['', Validators.required],
    ageRange: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {

  }


  addChild() {
    console.log(this.registrationForm.valid)
    let ageRangeId = this.registrationForm.controls['ageRange'].value;
    let genderId = this.registrationForm.controls['gender'].value;
    this.modalController.dismiss({
      ageRangeId,
      genderId
    }, 'add')
  }


  cancel() {
    this.modalController.dismiss(null, 'cancel')
  }
}
