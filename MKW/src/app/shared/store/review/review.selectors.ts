import { Selector } from "@ngxs/store";
import { ReviewState } from "./review.state";
import { ReviewStateModel } from "./review.model";
import { STATUS_CODES } from "http";
import { ContentReviewPage } from "src/app/modules/content/models/content-review-page.model";
import { ContentUtils } from "src/app/core/Util/ContentUtils";


export class ReviewSelectors {

  @Selector([ReviewState])
  static GetCurrentReview(state: ReviewStateModel) {
    return state;
  }

  @Selector([ReviewState])
  static GetCurrentReviewId(state: ReviewStateModel) {
    return state.reviewDetails.id;
  }

  @Selector([ReviewState])
  static GetReviewViewModel(state: ReviewStateModel): ContentReviewPage {
    let reviewState = state;
    let contentReviewPage: ContentReviewPage = {
      reviewId: reviewState.reviewDetails.id!,
      reviewTitle: reviewState.reviewDetails.title!,
      reviewDescription: reviewState.reviewDetails.description,
      reviewAuthor: {
        userName: reviewState.reviewOwner.userName,
        profilePictureUrl: reviewState.reviewOwner.profilePictureUrl,
        creatorId: reviewState.reviewOwner.id
      },
      reviewedContentInformation: {
        title: reviewState.reviewContent.title!,
        picturePath:
          reviewState.reviewContent.picturePath ?
            ContentUtils.picturePathFromPlatformId(reviewState.reviewContent.platformId as number) + reviewState!.reviewContent!.picturePath :
            undefined,
        contentId: reviewState.reviewContent.contentId!,
        platformId: reviewState.reviewContent.platformId!,
        externalContentId: reviewState.reviewContent.externalContentId!
      },
      reviewRating: reviewState.reviewDetails.rating!,
      reviewCreationDate: reviewState.reviewDetails.creationDate!,
      reviewAwardInformation: {
        bronzeAwardCount: reviewState.reviewAwards.bronzeAwards,
        goldenAwardCount: reviewState.reviewAwards.goldenAwards,
        silverAwardCount: reviewState.reviewAwards.silverAwards
      }
    }


    return contentReviewPage;
  }
}