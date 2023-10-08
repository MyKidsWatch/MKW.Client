import { ReviewContentModel, ReviewDetailsModel, ReviewOwnerModel, ReviewStateModel } from "./review.model";
import { Injectable } from '@angular/core';


import { State, StateContext, Action } from '@ngxs/store';
import { ReviewService } from "src/app/core/services/review.service";
import { CreateReview, DeleteReview, EditReview, ReportReview, SetReviewState } from "./review.actions";
import { take } from "rxjs";
import { get } from "http";


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
        this.reviewService.getReviewById(reviewId)
        .pipe(take(1))
        .subscribe(res =>{

            let state = getState();
            let reviewDTO = res.content![0];

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
            patchState(state);

        });
    }

    @Action(CreateReview)
    CreateReview({getState, setState} : StateContext<ReviewStateModel>, {title, rating, reviewText} : CreateReview)
    {

    }

    @Action(EditReview)
    EditReview({getState, setState} : StateContext<ReviewStateModel>, {reviewId, rating, reviewText} : EditReview)
    {

    }

    @Action(ReportReview)
    ReportReview({getState, setState} : StateContext<ReviewStateModel>, {reviewId, reasonId} : ReportReview)
    {

    }

    @Action(DeleteReview)
    DeleteReview({getState, setState} : StateContext<ReviewStateModel>, {reviewId} : DeleteReview)
    {
        
    }

    
}