import { ReviewAwardInformation, ReviewContentModel, ReviewDetailsModel, ReviewOwnerModel, ReviewStateModel } from "./review.model";
import { Injectable } from '@angular/core';


import { State, StateContext, Action } from '@ngxs/store';
import { ReviewService } from "src/app/core/services/review.service";
import { CreateReview, DeleteReview, EditReview, GiveCurrentReviewAward, ReportReview, SetReviewState } from "./review.actions";
import { catchError, of, take, tap } from "rxjs";
import { get } from "http";
import { AwardPurchaseDto, CreateReviewDto, GiveAwardDto, ICreateReviewDto, IUpdateReviewDto, ReviewDetailsDto, UpdateReviewDto } from "src/app/core/proxies/mkw-api.proxy";
import { patch } from "@ngxs/store/operators";
import { AwardService } from "src/app/core/services/award.service";


const defautlState: ReviewStateModel = {
    reviewContent: {},
    reviewDetails: {
    },
    reviewOwner: {
        id: 0,
        userName: '',
    },
    reviewAwards: {
        bronzeAwards: 0,
        goldenAwards: 0,
        silverAwards: 0
    }
}

@State<ReviewStateModel>({
    name: 'reviewState',
    defaults: defautlState
})

@Injectable()
export class ReviewState {

    constructor(private reviewService: ReviewService, private awardService: AwardService) { }

    @Action(SetReviewState)
    SetReviewState({ getState, patchState }: StateContext<ReviewStateModel>, { reviewId }: SetReviewState) {
        return this.reviewService.getReviewById(reviewId)
            .pipe(take(1))
            .pipe(tap(res => {

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
                    id: reviewDTO.person!.id!,
                    userName: reviewDTO.person!.username!,
                    profilePictureUrl: 'assets/icon/default.jpg'
                };

                let reviewAwards: ReviewAwardInformation = {
                    bronzeAwards: reviewDTO.bronzeAwards!,
                    goldenAwards: reviewDTO.goldenAwards!,
                    silverAwards: reviewDTO.silverAwards!,
                }

                state.reviewContent = reviewContent;
                state.reviewDetails = reviewDetails;
                state.reviewOwner = reviewOwner;
                state.reviewAwards = reviewAwards;

                patchState(state);
            }));
    }

    @Action(CreateReview)
    CreateReview({ getState, patchState }: StateContext<ReviewStateModel>, { title, rating, reviewText, contentId, platformId }: CreateReview) {
        let createReviewDTO: ICreateReviewDto = {
            externalContentId: contentId,
            platformId: platformId,
            title: title,
            text: reviewText,
            stars: rating
        }

        return this.reviewService.registerReview(new CreateReviewDto(createReviewDTO))
            .pipe(take(1))
            .pipe(tap(res => {

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
                    id: reviewDTO.person!.id!,
                    userName: reviewDTO.person!.username!,
                    profilePictureUrl: 'assets/icon/default.jpg'
                };

                state.reviewContent = reviewContent;
                state.reviewDetails = reviewDetails;
                state.reviewOwner = reviewOwner;
                patchState(state);
            }));
    }

    @Action(EditReview)
    EditReview({ getState, patchState }: StateContext<ReviewStateModel>, { reviewId, rating, reviewText, reviewTitle }: EditReview) {
        let updateReviewDTO: IUpdateReviewDto = {
            reviewId: reviewId,
            stars: rating,
            text: reviewText,
            title: reviewTitle
        }

        return this.reviewService.editReview(new UpdateReviewDto(updateReviewDTO))
            .pipe(take(1))
            .pipe(tap(res => {
                let state = getState();

                if (res.isSuccess == false)
                    return;

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
                    id: reviewDTO.person!.id!,
                    userName: reviewDTO.person!.username!,
                    profilePictureUrl: 'assets/icon/default.jpg'
                };

                state.reviewContent = reviewContent;
                state.reviewDetails = reviewDetails;
                state.reviewOwner = reviewOwner;

                patchState(state);

            }))

    }

    @Action(DeleteReview)
    DeleteReview({ getState, setState }: StateContext<ReviewStateModel>, { reviewId }: DeleteReview) {
        return this.reviewService.deleteReview(reviewId)
            .pipe(take(1))
            .pipe(tap(res => {
                setState(defautlState);
            }));
    }

    @Action(GiveCurrentReviewAward)
    GiveCurrentReviewAward({ getState, setState }: StateContext<ReviewStateModel>, { awardId }: GiveCurrentReviewAward) {

        let currentReview = getState();

        let request: GiveAwardDto = new GiveAwardDto();
        request.awardId = awardId;
        request.reviewId = currentReview.reviewDetails.id!;

        return this.awardService.giveReviewAward(request)
            .pipe(take(1))
            .pipe(tap(res => {

                let response: AwardPurchaseDto = res.content![0];
                let reviewInformation = response.award!.review!;

                currentReview.reviewAwards.bronzeAwards = reviewInformation.bronzeAwards!;
                currentReview.reviewAwards.silverAwards = reviewInformation.silverAwards!;
                currentReview.reviewAwards.goldenAwards = reviewInformation.goldenAwards!;

                setState(currentReview)
            }))
    }


    private ReviewDetailsDtoToState(reviewDTO: ReviewDetailsDto, state: ReviewStateModel) {
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
            id: reviewDTO.person!.id!,
            userName: reviewDTO.person!.username!,
            profilePictureUrl: 'assets/icon/default.jpg'
        };

        state.reviewContent = reviewContent;
        state.reviewDetails = reviewDetails;
        state.reviewOwner = reviewOwner;

        return state;
    }

}