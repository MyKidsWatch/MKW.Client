import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { CreateReviewDto, ICreateReviewDto } from 'src/app/core/proxies/mkw-api.proxy';
import { ReviewService } from 'src/app/core/services/review.service';

@Component({
  selector: 'app-content-add-review-page',
  templateUrl: './content-add-review-page.component.html',
  styleUrls: ['./content-add-review-page.component.scss'],
})
export class ContentAddReviewPageComponent  implements OnInit {

  reviewForm: FormGroup = this.formBuilder.group({
    reviewTitle: ['', [Validators.required]],
    reviewText: ['', [Validators.required]],
    stars: ['', [Validators.required]]
  });

  
  private contentId: string = '';
  private platformId: number = 1;

  constructor(private formBuilder: FormBuilder, private reviewService: ReviewService) { 
    console.log("Entrei no component");

  }

  
  ngOnInit() {

      console.log("Entrei no component");
  }



  private sendReview()
  {
    let createReviewDTO: ICreateReviewDto = {
      externalContentId: this.contentId,
      platformId: this.platformId,
      title: this.reviewForm.controls['reviewTitle'].value,
      text: this.reviewForm.controls['reviewText'].value,
      stars: this.reviewForm.controls['stars'].value
    }

    return this.reviewService.registerReview(new CreateReviewDto(createReviewDTO));
  }

  submitReview()
  {
    this.sendReview()
    .pipe(take(1))
    .subscribe({
      next: (res) =>{

      },
      error: (err) =>{
        alert("Erro ao cadastrar a review");
      }
    });  

  }

  goBack() {
    window.history.back();
  }
}
