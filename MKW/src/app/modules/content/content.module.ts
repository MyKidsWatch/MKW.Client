import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ContentComponent } from './content.component';
import { StarsRatingComponent } from '../../shared/components/stars-rating/stars-rating.component';
import { ContentReviewPageComponent } from './pages/content-review-page/content-review-page.component';
import { ContentFeedPageComponent } from './pages/content-feed-page/content-feed-page.component';
import { ContentReviewerPageComponent } from './pages/content-reviewer-page/content-reviewer-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentClient, ContentClient, ProfileClient, ReportClient, ReviewClient } from 'src/app/core/proxies/mkw-api.proxy';
import { ReviewService } from 'src/app/core/services/review.service';
import { HeaderBackComponent } from 'src/app/shared/components/header-back/header-back.component';
import { ContentService } from 'src/app/core/services/content.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { CommentFacade } from 'src/app/shared/facades/comment.facade';
import { NgxsModule } from '@ngxs/store';
import { CommentState } from 'src/app/shared/store/comments/comment.state';
import { ReportService } from 'src/app/core/services/report.service';
import { EditCommentModalComponent } from './components/edit-comment-modal/edit-comment-modal.component';
import { ReportCommentModalComponent } from './components/report-comment-modal/report-comment-modal.component';
import { ReviewFacade } from 'src/app/shared/facades/review.facade';
import { ReviewState } from 'src/app/shared/store/review/review.state';
import { ReportReviewModalComponent } from './components/report-review-modal/report-review-modal.component';
import { ReviewEditModalComponent } from './components/review-edit-modal/review-edit-modal.component';
import { ReviewAddModalComponent } from './components/review-add-modal/review-add-modal.component';
import { ProfileService } from 'src/app/core/services/profile.service';

const routes: Routes = [
  {
    path: 'feed/:contentId/:platformId',
    component: ContentFeedPageComponent
  },
  {
    path: 'review/:id',
    component: ContentReviewPageComponent
  },
  {
    path: 'reviewer/:username',
    component: ContentReviewerPageComponent
  }
];

const parentRoute: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: routes
  }
]

@NgModule({
  declarations: [
    ContentComponent, 
    StarsRatingComponent, 
    ContentReviewPageComponent, 
    ContentFeedPageComponent, 
    ContentReviewerPageComponent, 
    CommentCardComponent,
    EditCommentModalComponent,
    ReportCommentModalComponent,
    ReportReviewModalComponent,
    ReviewEditModalComponent,
    ReviewAddModalComponent
  ],
  imports: [
    CommonModule, 
    IonicModule, 
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(parentRoute),
    HeaderBackComponent,
    NgxsModule.forFeature([CommentState, ReviewState])

  ],
  exports: [ContentComponent],
  providers: [
    ReviewClient,
    ReviewService,
    ReviewFacade,
    ContentClient,
    ContentService,
    CommentFacade,
    CommentClient,
    CommentService,
    ReportClient,
    ReportService,
    ProfileClient,
    ProfileService,
  ]
})

export class ContentModule { }