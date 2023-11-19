import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateChildDto } from 'src/app/core/proxies/mkw-api.proxy';
import { ChildService } from 'src/app/core/services/child.service';
import { AgeRangeService } from 'src/app/core/services/age-range.service';
import { Location } from '@angular/common';
import { take } from 'rxjs';
import { UserFacade } from 'src/app/shared/facades/user.facade';
import { AgeRangeData } from '../../model/age-range.model';

@Component({
  selector: 'app-add-children',
  templateUrl: './add-children.component.html',
  styleUrls: ['./add-children.component.scss'],
})
export class AddChildrenComponent implements OnInit {
  public ageRanges: AgeRangeData[] = [];

  registrationForm: FormGroup = this.formBuilder.group({
    gender: ['', Validators.required],
    ageRange: ['', Validators.required]
  });

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private ageRangeService: AgeRangeService,
    private userFacade: UserFacade
  ) { }

  ngOnInit() {
    this.ageRangeService.getAgeRanges().subscribe({
      next: (res) => {
        res.content?.forEach(ageRange => {
          this.ageRanges.push({
            id: ageRange.id,
            initialAge: ageRange.initialAge,
            finalAge: ageRange.finalAge
          });

          console.log(ageRange);
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addChild() {
    let genderId = this.registrationForm.controls['gender'].value;
    let ageRangeId = this.registrationForm.controls['ageRange'].value;

    this.userFacade.addChild(genderId, ageRangeId)
      .subscribe({
        next: (res) => {
          this.location.back();
        },
        error: (err) => {
          alert("Erro durante o cadstro de sua criança, tente novamente mais tarde");
        }
      });
  }
}
