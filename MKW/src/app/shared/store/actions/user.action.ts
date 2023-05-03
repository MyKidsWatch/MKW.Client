import { TokenInfo, UserData } from "../models/user.model";

export class SaveUser{
    static readonly type ='[USER] Add';
    constructor(public payload: UserData) {}
}

export class UpdateToken{
    static readonly type ='[USER] Token Update';
    constructor(public payload: TokenInfo) {}
}

export class RemoveUser{
    static readonly type ='[USER] Remove';
    constructor() {}
}
