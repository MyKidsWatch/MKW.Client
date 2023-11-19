import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildService } from 'src/app/core/services/child.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgeRangeService } from 'src/app/core/services/age-range.service';
import { concatMap, of, take } from 'rxjs';
import { ChildDto } from 'src/app/core/proxies/mkw-api.proxy';
import { Location } from '@angular/common';
import { AgeRangeData } from '../../model/age-range.model';

@Component({
  selector: 'app-edit-children',
  templateUrl: './edit-children.component.html',
  styleUrls: ['./edit-children.component.scss'],
})
export class EditChildrenComponent implements OnInit, AfterViewInit {

  public ageRanges: AgeRangeData[] = [];
  private childDto?: ChildDto;
  public childId?: number;

  updateForm: FormGroup = this.formBuilder.group({
    gender: ['', Validators.required],
    ageRange: ['', Validators.required]
  });

  constructor(
    private route: ActivatedRoute,
    private childService: ChildService,
    private formBuilder: FormBuilder,
    private ageRangeService: AgeRangeService,
    private location: Location
  ) { }

  ngOnInit() {
    this.childId = Number(this.route.snapshot.paramMap.get('id')) as number;

    this.ageRangeService.getAgeRanges().pipe(concatMap((response) => {
      response.content?.forEach(ageRange => {
        this.ageRanges.push({
          id: ageRange.id,
          initialAge: ageRange.initialAge,
          finalAge: ageRange.finalAge
        });
      })

      return this.childService.getChildren();
    })).subscribe({
      next: (response) => {
        let child = response.content?.find(el => el.id == this.childId);
        this.updateForm.setValue({
          gender: child?.genderId,
          ageRange: child?.ageRangeId
        })

        this.childDto = child;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngAfterViewInit(): void {

  }
  deleteChild() {
    this.childService.deleteChild(this.childId!).pipe(take(1)).subscribe({
      next: () => {
        alert("Criança excluída com sucesso");
        this.location.back();
      },
      error: () => {
        alert("Erro durante a exclusão de sua criança, tente novamente mais tarde");
      }
    })
  }

  updateChild() {
    this.childDto!.genderId = this.updateForm.controls['gender'].value;
    this.childDto!.ageRangeId = this.updateForm.controls['ageRange'].value;

    this.childService.updateChild(this.childDto!).pipe(take(1)).subscribe({
      next: () => {
        alert("Criança atualizada com sucesso");
        this.location.back();
      },
      error: () => {
        alert("Erro durante a atualização de sua criança, tente novamente mais tarde");
      }
    })
  }





}
