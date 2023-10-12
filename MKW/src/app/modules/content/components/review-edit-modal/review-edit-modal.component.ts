import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { CreateReviewDto, ICreateReviewDto } from 'src/app/core/proxies/mkw-api.proxy';
import { ReportService } from 'src/app/core/services/report.service';
import { ReviewService } from 'src/app/core/services/review.service';
import { ReviewFacade } from 'src/app/shared/facades/review.facade';
import { ContentInformation, ContentReviewPage } from '../../models/content-review-page.model';

@Component({
  selector: 'app-review-edit-modal',
  templateUrl: './review-edit-modal.component.html',
  styleUrls: ['./review-edit-modal.component.scss'],
})
export class ReviewEditModalComponent  implements OnInit {

  reviewForm: FormGroup = this.formBuilder.group({
    reviewTitle: ['', [Validators.required]],
    reviewText: ['', [Validators.required]],
    stars: ['', [Validators.required]]
  });



  public contentInformation?: ContentInformation;
  constructor(
    private formBuilder: FormBuilder, 
    private reviewFacade: ReviewFacade,
    private modalController: ModalController) {  
  }

  ngOnInit() {
    this.reviewFacade.getCurrentReviewViewModel()
    .pipe(take(1))
    .subscribe(res =>{
      this.contentInformation = res.reviewedContentInformation;
      this.reviewForm.patchValue({
        reviewTitle: res.reviewTitle,
        reviewText: res.reviewDescription,
        stars: res.reviewRating
      });

    })
  }


  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  public sendReview()
  {
    let createReviewInformation: ICreateReviewDto = {
      title: this.reviewForm.controls['reviewTitle'].value,
      text: this.reviewForm.controls['reviewText'].value,
      stars: this.reviewForm.controls['stars'].value
    }

    this.modalController.dismiss(createReviewInformation, 'edit');
  }

  setStarValue(value: number)
  {
    this.reviewForm.patchValue({
      stars: value
    });

  }

  isStarMarked(value: number)
  {
    let starsValue = this.reviewForm.controls['stars'].value;
    return value <= starsValue;
  }
}