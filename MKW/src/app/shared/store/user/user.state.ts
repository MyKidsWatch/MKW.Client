import { Action, Selector, State, StateContext, getStoreMetadata } from "@ngxs/store";
import { ChildInformation, TokenInfo, UserData, UserReview } from "./user.model";
import { ActivateUserEmail, AddChildToUser, LogUserOff, LoginUser, RefreshCurrentUserToken, RemoveUserChild, UpdateChildList, UpdateCurrentUserInformation, UpdateUserChild, UpdateUserReviews } from "./user.action";
import { Injectable } from '@angular/core';
import { AuthService } from "src/app/core/services/auth.service";
import { ILoginRequestDTO } from "src/app/modules/auth/models/login-request";
import { log, table } from "console";
import { map, switchMap, take, tap } from "rxjs";
import { AccountService } from "src/app/core/services/account.service";
import { get } from "http";
import { ChildDto, ConfirmAccountEmailDTO, CreateChildDto } from "src/app/core/proxies/mkw-api.proxy";
import { stat } from "fs";
import { ChildService } from "src/app/core/services/child.service";
import { TranslateService } from "@ngx-translate/core";
import { ReviewService } from "src/app/core/services/review.service";
import { ReviewAwardInformation, ReviewContentModel, ReviewDetailsModel, ReviewOwnerModel } from "../review/review.model";

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

    constructor(
        private authService: AuthService,
        private accountService: AccountService,
        private childService: ChildService,
        private reviewService: ReviewService) { }


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
                    coinCount: response.associatedWithPerson!.balance!,
                    childrenInformation: state.user?.childrenInformation || [],
                    userReviews: state.user?.userReviews || [],
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

    @Action(AddChildToUser)
    public addChildToUser({ getState, patchState }: StateContext<UserStateModel>, { ageRangeId, genderId }: AddChildToUser) {

        let user = getState().user!;

        let createChildDTO: CreateChildDto = new CreateChildDto();
        createChildDTO.ageRangeId = ageRangeId;
        createChildDTO.genderId = genderId;

        return this.childService.createChild(createChildDTO)
            .pipe(take(1))
            .pipe(tap(res => {
                let addedChild = res.content![0];

                if (user.childrenInformation == undefined)
                    user.childrenInformation = [];

                let newChild: ChildInformation = {
                    ageRangeId: addedChild.ageRangeId!,
                    childId: addedChild.id!,
                    genderId: addedChild.genderId!
                }

                user.childrenInformation.push(newChild);

                patchState({ user })
            }));
    }

    @Action(RemoveUserChild)
    public removeChildFromUser({ getState, patchState }: StateContext<UserStateModel>, { childId }: RemoveUserChild) {
        let user = getState().user!;

        return this.childService.deleteChild(childId)
            .pipe(take(1))
            .pipe(tap(res => {
                user.childrenInformation = user.childrenInformation.filter(child => child.childId != childId);
                patchState({ user })
            }));
    }

    @Action(UpdateChildList)
    public updateChildList({ getState, patchState }: StateContext<UserStateModel>, { }: UpdateChildList) {
        let user = getState().user!;

        return this.childService.getChildren()
            .pipe(take(1))
            .pipe(tap(res => {

                let userChildren: ChildInformation[] = []
                let children = res.content!
                children.forEach(child => {
                    let userChild: ChildInformation = {
                        ageRangeId: child.ageRangeId!,
                        childId: child.id!,
                        genderId: child.genderId!
                    }

                    userChildren.push(userChild)
                })


                user.childrenInformation = userChildren;
                patchState({ user })
            }));
    }

    @Action(UpdateUserChild)
    public updateChildFromUser({ getState, patchState }: StateContext<UserStateModel>, { childId, ageRangeId, genderId }: UpdateUserChild) {
        let user = getState().user!;

        let request: ChildDto = new ChildDto();
        request.ageRangeId = ageRangeId;
        request.genderId = genderId;
        request.id = childId;
        request.personId = 0;

        return this.childService.updateChild(request)
            .pipe(take(1))
            .pipe(tap(res => {
                user.childrenInformation.forEach(el => {
                    if (el.childId == childId) {
                        el.ageRangeId = ageRangeId;
                        el.genderId = genderId;
                    }
                })
                patchState({ user })
            }));
    }

    @Action(UpdateUserReviews)
    public updateUserReviews({ getState, patchState }: StateContext<UserStateModel>) {
        let user = getState().user!;

        return this.reviewService.getReviewByUserId(user.userId!)
            .pipe(take(1))
            .pipe(tap(res => {
                let userReviews = res.content;
                let stateUserReviews: UserReview[] = [];

                userReviews?.forEach(reviewDTO => {
                    let reviewDetails: ReviewDetailsModel = {
                        id: reviewDTO.id!,
                        creationDate: reviewDTO.createDate!,
                        description: reviewDTO.text!,
                        rating: reviewDTO.stars,
                        title: reviewDTO.title!,
                        isEdited: reviewDTO.edited!
                    };

                    let reviewContent: ReviewContentModel = {
                        contentId: reviewDTO.content!.id!,
                        externalContentId: reviewDTO.content!.externalId!,
                        picturePath: reviewDTO.content!.imageUrl!,
                        platformId: reviewDTO.content!.platformId!,
                        title: reviewDTO.content!.name!
                    };

                    let reviewOwner: ReviewOwnerModel = {
                        id: reviewDTO.person!.id!,
                        userName: reviewDTO.person!.username!,
                        profilePictureUrl: reviewDTO.person!.imageURL!,
                    };

                    let reviewAwards: ReviewAwardInformation = {
                        bronzeAwards: reviewDTO.bronzeAwards!,
                        goldenAwards: reviewDTO.goldenAwards!,
                        silverAwards: reviewDTO.silverAwards!,
                    }

                    let userReview: UserReview = {
                        reviewAwards,
                        reviewContent,
                        reviewDetails,
                        reviewOwner,
                        commentCount: reviewDTO.commentsQuantity!
                    }

                    stateUserReviews.push(userReview);
                })

                user.userReviews = stateUserReviews;

                patchState({ user })
            }));
    }
}