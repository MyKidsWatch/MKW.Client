export class RefreshCurrentUserToken{
    static readonly type ='[USER] Refresh current user token';
    constructor() {}
}

export class UpdateCurrentUserInformation{
    static readonly type = '[USER] Update current User information';
}

export class LoginUser{
    static readonly type ='[USER] User login';
    constructor(public credentials: string, public password: string) {}
}


export class LogUserOff{
    static readonly type = '[USER] Logoff user';
    constructor(){}
}

export class ActivateUserEmail{
    static readonly type = '[USER] Activate user email';
    constructor(public keycode: string){}
}