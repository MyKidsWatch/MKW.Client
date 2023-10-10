export class SetReviewState{
    static readonly type = '[Review] Set review state';

    constructor(public reviewId: number){}
}

export class CreateReview{
    static readonly type = '[Review] Create Review';

    constructor(public title: string, public rating: number, public platformId: number, public contentId: string, public reviewText?: string){}
}

export class EditReview{
    static readonly type = '[Review] Edit Review';

    constructor(public reviewId: number, public reviewTitle: string, public reviewText: string, public rating: number){}
}

export class ReportReview{
    static readonly type = '[Review] Report Review';

    constructor(public reasonId: number, public reviewId: number){}
}
export class DeleteReview{
    static readonly type = '[Review] Delete Review';

    constructor(public reviewId: number){}
}

