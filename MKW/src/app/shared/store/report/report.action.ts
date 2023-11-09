export class SetReportList{
    static readonly type = '[Report] Set Report List';

    constructor(public pageSize: number = 10, public pageIndex: number = 1, public reportReason?: number){}
}

export class SetIndividualReport{
    static readonly type = '[Report] Set Individual Report';

    constructor(public reportId: number ){}
}


export class RespondToReport{
    static readonly type = '[Report] Respond To Report';

    constructor(){}

}

