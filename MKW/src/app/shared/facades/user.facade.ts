import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommentClient, CreateReportDto } from 'src/app/core/proxies/mkw-api.proxy';
import { Store } from '@ngxs/store';
import { CommentService } from 'src/app/core/services/comment.service';
import { AddComment, AnswerComment, DeleteComment, EditComment, ReportComment, UpdateCommentList } from '../store/comments/comment.actions';
import { ReportService } from 'src/app/core/services/report.service';
import { CommentSelectors } from '../store/comments/comment.selectors';
import { ActivateUserEmail, AddChildToUser, LogUserOff, LoginUser, RefreshCurrentUserToken, RemoveUserChild, UpdateChildList, UpdateCurrentUserInformation, UpdateUserChild } from '../store/user/user.action';
import { UserSelectors } from '../store/user/user.selectors';
import { TokenInfo, UserData } from '../store/user/user.model';
import { UserStateModel } from '../store/user/user.state';
import { ActivateEmailComponent } from 'src/app/modules/home/activate-email/activate-email.component';
import { Observable, map } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class UserFacade {

    constructor(private store: Store) { }

    public getUserToken(): TokenInfo | undefined {
        return this.store.selectSnapshot(UserSelectors.getTokenInfo);
    }

    public getUserState(): UserData | undefined {
        return this.store.selectSnapshot(UserSelectors.getUser);
    }

    public getUserAdminState(): Observable<boolean> {
        return this.store.select(UserSelectors.getUserAdminInformation);
    }

    public getUserCurrentCoinCount(): Observable<number | undefined> {
        return this.store.select(UserSelectors.getUserCoins);
    }

    public getUserCurrentCoinCountSnapshot(): number | undefined {
        return this.store.selectSnapshot(UserSelectors.getUserCoins);
    }

    public loginUser(credentials: string, password: string) {
        return this.store.dispatch(new LoginUser(credentials, password));
    }

    public updateUserInformation() {
        return this.store.dispatch(new UpdateCurrentUserInformation());
    }


    public refreshUserToken() {
        return this.store.dispatch(new RefreshCurrentUserToken());
    }

    public logOffUser() {
        return this.store.dispatch(new LogUserOff());
    }

    public activateUserEmail(keycode: string) {
        return this.store.dispatch(new ActivateUserEmail(keycode))
    }


    public addChild(genderId: number, ageRangeId: number) {
        return this.store.dispatch(new AddChildToUser(genderId, ageRangeId))
    }

    public removeChild(childId: number) {
        return this.store.dispatch(new RemoveUserChild(childId))
    }

    public updateChild(childId: number, genderId: number, ageRangeId: number) {
        return this.store.dispatch(new UpdateUserChild(childId, genderId, ageRangeId))
    }

    public updateUserChildren() {
        return this.store.dispatch(new UpdateChildList());
    }

    public getUserChildren() {
        return this.store.select(UserSelectors.getUserChildren)
    }

    public getUserUniqueChildren() {
        return this.store.select(UserSelectors.getUserUniqueChildren)
    }


    public getUserChildrenCards(translateService: TranslateService) {
        return this.store.select(UserSelectors.getUserChildrenCard).pipe(map(filterFn => filterFn(translateService)))
    }

    public getUserUniqueChildrenCards(translateService: TranslateService) {
        return this.store.select(UserSelectors.getUserUniqueChildrenCards).pipe(map(filterFn => filterFn(translateService)))
    }
}