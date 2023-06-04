import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateChildDto } from 'src/app/core/proxies/mkw-api.proxy';
import { ChildService } from 'src/app/core/services/child.service';
import { AgeRangeData } from '../view-children/view-children.component';
import { AgeRangeService } from 'src/app/core/services/age-range.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {take} from 'rxjs';
@Component({
  selector: 'app-add-children',
  templateUrl: './add-children.component.html',
  styleUrls: ['./add-children.component.scss'],
})
export class AddChildrenComponent  implements OnInit {
  public ageRanges: AgeRangeData[] = [];

  registrationForm: FormGroup = this.formBuilder.group({
    gender: ['', Validators.required],
    ageRange: ['', Validators.required]
  });


  constructor(private location: Location, private childService: ChildService, private formBuilder: FormBuilder, private ageRangeService: AgeRangeService) { }

  ngOnInit() {

    this.ageRangeService.getAgeRanges().subscribe({
      next: (res) =>{

        res.content?.forEach(ageRange =>{
            this.ageRanges.push({
              id: ageRange.id,
              initialAge: ageRange.initialAge,
              finalAge: ageRange.finalAge
            });
        })
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }


  addChild()
  {
    let createChild: CreateChildDto = new CreateChildDto();
    createChild.genderId = this.registrationForm.controls['gender'].value;
    createChild.ageRangeId = this.registrationForm.controls['ageRange'].value;

    this.childService.createChild(createChild).pipe(take(1)).subscribe({
      next: (res) =>{
          this.location.back();
      },  
      error: (err) =>{
          alert("Erro durante o cadstro de sua criança, tente novamente mais tarde");
      }
    });
  }
}
