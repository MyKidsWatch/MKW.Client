import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommentClient, CreateReportDto } from 'src/app/core/proxies/mkw-api.proxy';
import { Store } from '@ngxs/store';
import { CommentService } from 'src/app/core/services/comment.service';
import { AddComment, AnswerComment, DeleteComment, EditComment, ReportComment, UpdateCommentList } from '../store/comments/comment.actions';
import { ReportService } from 'src/app/core/services/report.service';
import { CommentSelectors } from '../store/comments/comment.selectors';
import { ActivateUserEmail, LogUserOff, LoginUser, RefreshCurrentUserToken, UpdateCurrentUserInformation } from '../store/user/user.action';
import { UserSelectors } from '../store/user/user.selectors';
import { TokenInfo, UserData } from '../store/user/user.model';
import { UserStateModel } from '../store/user/user.state';
import { ActivateEmailComponent } from 'src/app/modules/home/activate-email/activate-email.component';
import { Observable } from 'rxjs';
import { ReportSelectors } from '../store/report/report.selectors';
import { SetIndividualReport, SetReportList } from '../store/report/report.action';


@Injectable({
    providedIn: 'root'
  })
  
export class ReportFacade{
  
    constructor(private store: Store){}

    
    setReportList(pageSize: number = 10, pageIndex: number = 1, reportReason?: number)
    {
        return this.store.dispatch(new SetReportList(pageSize, pageIndex, reportReason));
    }

    setCurrentReport(reportId: number)
    {
        return this.store.dispatch(new SetIndividualReport(reportId));
    }

    getReportList()
    {
        return this.store.select(ReportSelectors.GetReportList);
    }

    getCurrentReport()
    {
        return this.store.select(ReportSelectors.GetCurrentReport);
    }

    getPaginationData()
    {
        return this.store.select(ReportSelectors.GetPaginationData)
    }
}