import { TokenInfo, UserData } from "./user.model";

export class SetUserData{
    static readonly type ='[USER] Set User Data';
    constructor(public payload: UserData) {}
}

export class SetTokenInfo{
    static readonly type ='[USER] Set Token Info';
    constructor(public payload: TokenInfo | undefined) {}
}


export class UpdateTokenInfo{
    static readonly type ='[USER] Update Token Info';
    constructor(public payload: TokenInfo) {}
}

export class RemoveUser{
    static readonly type ='[USER] Remove User from state';
    constructor() {}
}

export class LoginUser{
    static readonly type ='[USER] User login';
    constructor(public credentials: string, public password: string) {}
}


export class LogUserOff{
    static readonly type = '[USER] Logoff user';
    constructor(){}
}