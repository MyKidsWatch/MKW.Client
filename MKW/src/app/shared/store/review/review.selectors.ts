import { Selector } from "@ngxs/store";
import { ReviewState } from "./review.state";
import { ReviewStateModel } from "./review.model";
import { STATUS_CODES } from "http";


export class ReviewSelectors{

    @Selector([ReviewState])
    static GetCurrentReview(state: ReviewStateModel)
    {
        return state;
    }

    @Selector([ReviewState])
    static GetReviewViewModel()
    {

    }
}