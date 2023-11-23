export class SetReportList {
    static readonly type = '[Report] Set Report List';

    constructor(public pageSize: number = 10, public pageIndex: number = 1, public reportReason?: number, public statusId?: number, public ascending?: boolean) { }
}

export class SetIndividualReport {
    static readonly type = '[Report] Set Individual Report';

    constructor(public reportId: number) { }
}


export class RespondToCurrentReport {
    static readonly type = '[Report] Respond To Current Report';

    constructor(
        public statusId: number,
        public deleteReview: boolean,
        public deleteComment: boolean,
        public deleteProfile: boolean) { }
}

