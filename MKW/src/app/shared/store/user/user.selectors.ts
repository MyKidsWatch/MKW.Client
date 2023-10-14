import { Selector } from "@ngxs/store";
import { UserState, UserStateModel } from "./user.state";


export class UserSelectors{

    @Selector([UserState])
    static getUser(state: UserStateModel)
    {
        return state.user;
    }

    @Selector([UserState])
    static getTokenInfo(state: UserStateModel)
    {
        return state.token;
    }

}