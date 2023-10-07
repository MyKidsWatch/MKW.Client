import { Action, Selector, State, StateContext, getStoreMetadata } from "@ngxs/store";
import { TokenInfo, UserData } from "./user.model";
import { RemoveUser, SetTokenInfo, SetUserData } from "./user.action";
import { Injectable } from '@angular/core';

export class UserStateModel{
    user?: UserData;
    token?: TokenInfo;
}


@State<UserStateModel>({
    name: 'userState',
    defaults: {
        user: new UserData(),
        token: new TokenInfo()
    }
})

@Injectable()
export class UserState{

    @Selector()
    static getUser(state: UserStateModel)
    {
        return state.user;
    }

    @Selector([UserState])
    static getTokenInfo(state: UserStateModel)
    {
        return state.token;
    }


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
}