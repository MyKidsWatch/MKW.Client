import { TokenInfo, UserData } from "../models/user.model";

export class SetUserData{
    static readonly type ='[USER] Set User Data';
    constructor(public payload: UserData) {}
}

export class SetTokenInfo{
    static readonly type ='[USER] Set Token Info';
    constructor(public payload: TokenInfo) {}
}


export class UpdateTokenInfo{
    static readonly type ='[USER] Update Token Info';
    constructor(public payload: TokenInfo) {}
}

export class RemoveUser{
    static readonly type ='[USER] Remove User from state';
    constructor() {}
}
