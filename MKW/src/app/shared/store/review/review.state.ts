import { ReviewContentModel, ReviewDetailsModel, ReviewOwnerModel, ReviewStateModel } from "./review.model";
import { Injectable } from '@angular/core';


import { State, StateContext, Action } from '@ngxs/store';
import { ReviewService } from "src/app/core/services/review.service";
import { CreateReview, DeleteReview, EditReview, ReportReview, SetReviewState } from "./review.actions";
import { take } from "rxjs";
import { get } from "http";
import { CreateReviewDto, ICreateReviewDto, IUpdateReviewDto, ReviewDetailsDto, UpdateReviewDto } from "src/app/core/proxies/mkw-api.proxy";
import { patch } from "@ngxs/store/operators";


const defautlState: ReviewStateModel = {
    reviewContent: {},
    reviewDetails: {
    },
    reviewOwner: {
        userName: '',
    }
}

@State<ReviewStateModel>({
    name: 'reviewState',
    defaults: defautlState
})
  
@Injectable()
export class ReviewState
{

    constructor(private reviewService: ReviewService){}

    @Action(SetReviewState)
    SetReviewState({getState, patchState} : StateContext<ReviewStateModel>, {reviewId} : SetReviewState)
    {
        return this.reviewService.getReviewById(reviewId)
        .pipe(take(1))
        .subscribe(res =>{

            let state = getState();
            let reviewDTO = res.content![0];

            state = this.ReviewDetailsDtoToState(reviewDTO, state);

            patchState(state);
        });
    }

    @Action(CreateReview)
    CreateReview({getState, patchState} : StateContext<ReviewStateModel>, {title, rating, reviewText, contentId, platformId} : CreateReview)
    {
        let createReviewDTO: ICreateReviewDto = {
            externalContentId: contentId.toString(),
            platformId: platformId,
            title: title,
            text: reviewText,
            stars: rating
          }

        return this.reviewService.registerReview(new CreateReviewDto(createReviewDTO))
        .pipe(take(1))
        .subscribe(res => {
            let state = getState();
            let reviewDTO = res.content![0];

            state = this.ReviewDetailsDtoToState(reviewDTO, state);

            patchState(state);
        });  
    }

    @Action(EditReview)
    EditReview({getState, patchState} : StateContext<ReviewStateModel>, {reviewId, rating, reviewText, reviewTitle} : EditReview)
    {
        let updateReviewDTO: IUpdateReviewDto = {
            reviewId: reviewId,
            stars: rating,
            text: reviewText,
            title: reviewTitle
        }

        return this.reviewService.editReview(new UpdateReviewDto(updateReviewDTO))
        .pipe(take(1))
        .subscribe(res => {
            let state = getState();
            let reviewDTO = res.content![0];

            state = this.ReviewDetailsDtoToState(reviewDTO, state);

            patchState(state);
        });  
    }

    @Action(DeleteReview)
    DeleteReview({getState, setState} : StateContext<ReviewStateModel>, {reviewId} : DeleteReview)
    {
        return this.reviewService.deleteReview(reviewId)
        .pipe(take(1))
        .subscribe(res =>{
            setState(defautlState);
        });
    }

    private ReviewDetailsDtoToState(reviewDTO: ReviewDetailsDto, state: ReviewStateModel)
    {
        let reviewDetails: ReviewDetailsModel = {
            id: reviewDTO.id!,
            creationDate: reviewDTO.createDate!,
            description: reviewDTO.text!,
            rating: reviewDTO.stars,
            title: reviewDTO.title! 
         };

         let reviewContent: ReviewContentModel = {
             contentId: reviewDTO.content!.id!,
             externalContentId: reviewDTO.content!.externalId!,
             picturePath: reviewDTO.content!.imageUrl!,
             platformId: reviewDTO.content!.platformId!,
             title: reviewDTO.content!.name!
         };

         let reviewOwner: ReviewOwnerModel = {
             userName: reviewDTO.person!.username!,
             profilePictureUrl: 'assets/icon/default.jpg'
         };

         state.reviewContent = reviewContent;
         state.reviewDetails = reviewDetails;
         state.reviewOwner = reviewOwner;

        return state;
    }
    
}