

export class AddComment{
    static readonly type = '[Comment] Add Comment';

    constructor(public commentText: string, public reviewId: number){}
}



export class EditComment{
    static readonly type = '[Comment] Edit Comment';

    constructor(public commentText: string, public commentId: number){}
}

export class ReportComment{
    static readonly type = '[Comment] Report Comment';

    constructor(public reasonId: number, public commentId: number){}
}

export class AnswerComment{
    static readonly type = '[Comment] Answer Comment';

    constructor(public answerText: string, public commentId: number){}
}


export class DeleteComment{
    static readonly type = '[Comment] Delete Comment';

    constructor(public commentId: number){}
}

