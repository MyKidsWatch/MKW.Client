import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildService } from 'src/app/core/services/child.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgeRangeService } from 'src/app/core/services/age-range.service';
import { concatMap, of, take } from 'rxjs';
import { ChildDto } from 'src/app/core/proxies/mkw-api.proxy';
import { Location } from '@angular/common';
import { AgeRangeData } from '../../model/age-range.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-child-modal',
  templateUrl: './edit-child-modal.component.html',
  styleUrls: ['./edit-child-modal.component.scss'],
})
export class EditChildModalComponent implements OnInit {

  public ageRange?: number;
  public gender?: number;


  public ageRanges: AgeRangeData[] = [
    { id: 1, initialAge: 0, finalAge: 2 },
    { id: 2, initialAge: 3, finalAge: 5 },
    { id: 3, initialAge: 6, finalAge: 8 },
    { id: 4, initialAge: 9, finalAge: 11 },
    { id: 5, initialAge: 12, finalAge: 14 },
    { id: 6, initialAge: 15, finalAge: 17 }

  ];
  private childDto?: ChildDto;
  public childId?: number;

  updateForm: FormGroup = this.formBuilder.group({
    gender: ['', Validators.required],
    ageRange: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private ageRangeService: AgeRangeService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.updateForm.setValue(
      {
        ageRange: this.ageRange!,
        gender: this.gender!
      })
  }


  updateChild() {
    this.modalController.dismiss({
      ageRangeId: this.updateForm.controls['ageRange'].value,
      genderId: this.updateForm.controls['gender'].value
    }, 'update')
  }

  deleteChild() {
    this.modalController.dismiss(null, 'delete')
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel')
  }
}
