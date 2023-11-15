import { Action, Selector, State, StateContext, getStoreMetadata } from "@ngxs/store";
import { TokenInfo, UserData } from "./user.model";
import { ActivateUserEmail, LogUserOff, LoginUser, RefreshCurrentUserToken, UpdateCurrentUserInformation } from "./user.action";
import { Injectable } from '@angular/core';
import { AuthService } from "src/app/core/services/auth.service";
import { ILoginRequestDTO } from "src/app/modules/auth/models/login-request";
import { log } from "console";
import { map, switchMap, take, tap } from "rxjs";
import { AccountService } from "src/app/core/services/account.service";
import { get } from "http";
import { ConfirmAccountEmailDTO } from "src/app/core/proxies/mkw-api.proxy";
import { stat } from "fs";

export class UserStateModel {
    user?: UserData;
    token?: TokenInfo;
}


const defaultUserState: UserStateModel = {}

@State<UserStateModel>({
    name: 'userState',
    defaults: defaultUserState
})

@Injectable()
export class UserState {

    constructor(private authService: AuthService, private accountService: AccountService) { }


    @Action(LogUserOff)
    logOffUser(ctx: StateContext<UserStateModel>) { ctx.setState({}); }


    @Action(LoginUser)
    public loginUser({ getState, patchState }: StateContext<UserStateModel>, { credentials, password }: LoginUser) {
        let loginRequest: ILoginRequestDTO = {
            credential: credentials,
            password: password
        }

        return this.authService.authenticate(loginRequest)
            .pipe(take(1))
            .pipe(tap(res => {
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

    @Action(RefreshCurrentUserToken)
    public refreshUserToken({ getState, patchState }: StateContext<UserStateModel>) {
        return this.authService.refresh()
            .pipe(take(1))
            .pipe(tap(res => {
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

    @Action(UpdateCurrentUserInformation)
    public updateUserInformation({ getState, patchState }: StateContext<UserStateModel>) {
        return this.accountService.getUserInfo()
            .pipe(take(1))
            .pipe(tap(res => {

                const state = getState();
                let response = res.content![0];

                state.user = {
                    username: response.userName!,
                    firstName: response.firstName!,
                    isEmailVerified: response.emailConfirmed!,
                    userId: response.id!,
                    lastName: response.lastName!,
                    isAdmin: response.isAdminUser,
                    coinCount: response.associatedWithPerson!.balance!
                }


                patchState(state);
            }))
    }


    @Action(ActivateUserEmail)
    public activateUserEmail({ getState, patchState }: StateContext<UserStateModel>, { keycode }: ActivateUserEmail) {
        const state = getState();
        let confirmEmailRequest: ConfirmAccountEmailDTO = new ConfirmAccountEmailDTO();

        confirmEmailRequest.keycode = Number(keycode);
        confirmEmailRequest.userId = state.user?.userId!

        console.log(confirmEmailRequest);
        return this.accountService.activateEmail(confirmEmailRequest)
            .pipe(take(1))
            .pipe(tap(res => {
                state.user!.isEmailVerified = true;
                patchState(state);
            }))
    }

}