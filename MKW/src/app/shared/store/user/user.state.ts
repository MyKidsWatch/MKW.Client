import { Action, Selector, State, StateContext, getStoreMetadata } from "@ngxs/store";
import { TokenInfo, UserData } from "./user.model";
import { LoginUser, RemoveUser, SetTokenInfo, SetUserData } from "./user.action";
import { Injectable } from '@angular/core';
import { AuthService } from "src/app/core/services/auth.service";
import { ILoginRequestDTO } from "src/app/modules/auth/models/login-request";
import { log } from "console";
import { map, switchMap, take, tap } from "rxjs";

export class UserStateModel{
    user?: UserData;
    token?: TokenInfo;
}


const defaultUserState: UserStateModel = {}

@State<UserStateModel>({
    name: 'userState',
    defaults: defaultUserState
})

@Injectable()
export class UserState{

    constructor(private authService: AuthService){}

    @Action(SetUserData)
    setUserData(ctx: StateContext<UserStateModel>, { payload } : SetUserData)
    {
        ctx.patchState({
            user: payload
        })

    }

    @Action(SetTokenInfo)
    setTokenInfo(ctx: StateContext<UserStateModel>, {payload} : SetTokenInfo)
    {
        ctx.patchState({
            token: payload
        })
    }

    @Action(RemoveUser)
    removeUser(ctx: StateContext<UserStateModel>)
    {
        ctx.setState(new UserStateModel());
    }


    @Action(LoginUser)
    public loginUser({getState, patchState}: StateContext<UserStateModel>, {credentials, password} : LoginUser)
    {
        let loginRequest: ILoginRequestDTO = {
            credential: credentials,
            password: password
        }

        return this.authService.authenticate(loginRequest)
        .pipe(take(1))
        .pipe(tap(res =>{
            const state = getState();

            let tokenInfo = res.content![0];

            state.token = {
                accessToken: tokenInfo.accessToken!,
                expiresAt: tokenInfo.accessTokenExpiration!,
                refreshToken: tokenInfo.refreshToken!
            }

            patchState(state);
        }))
    }
    


}