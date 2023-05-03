import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UserData } from "../models/user.model";
import { RemoveUser, SaveUser } from "../actions/user.action";
import { Injectable } from '@angular/core';

export class UserStateModel{
    user?: UserData;
}


@State<UserStateModel>({
    name: 'userState',
    defaults: {
        user: undefined
    }
})

@Injectable()
export class UserState{

    @Selector()
    static getUser(state: UserStateModel)
    {
        return state.user;
    }


    @Action(SaveUser)
    saveUser({getState, patchState} : StateContext<UserStateModel>, { payload } : SaveUser)
    {
        const state = getState();
        patchState({
            user: payload
        })

    }

    @Action(RemoveUser)
    removeUser({getState, patchState} : StateContext<UserStateModel>)
    {
        const state = getState();
        patchState({
            user: undefined
        })

    }
}