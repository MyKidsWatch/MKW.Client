import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommentClient, CreateReportDto } from 'src/app/core/proxies/mkw-api.proxy';
import { Store } from '@ngxs/store';
import { CommentService } from 'src/app/core/services/comment.service';
import { AddComment, AnswerComment, DeleteComment, EditComment, ReportComment, UpdateCommentList } from '../store/comments/comment.actions';
import { ReportService } from 'src/app/core/services/report.service';
import { CommentSelectors } from '../store/comments/comment.selectors';
import { LogUserOff, LoginUser } from '../store/user/user.action';
import { UserSelectors } from '../store/user/user.selectors';
import { TokenInfo, UserData } from '../store/user/user.model';
import { UserStateModel } from '../store/user/user.state';


@Injectable({
    providedIn: 'root'
  })
  
export class UserFacade{
  
    constructor(private store: Store){}

    public getUserToken() : TokenInfo | undefined
    {
        return this.store.selectSnapshot(UserSelectors.getTokenInfo);
    }

    public getUserState() : UserData | undefined
    {
        return this.store.selectSnapshot(UserSelectors.getUser);
    }

    public loginUser(credentials: string, password: string)
    {
        return this.store.dispatch(new LoginUser(credentials, password));
    }

    public setUser(){


    }
    public updateUserInformation(){}



    public logOffUser()
    {
        return this.store.dispatch(new LogUserOff());
    }


}