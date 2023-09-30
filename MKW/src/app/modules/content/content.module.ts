import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ContentComponent } from './content.component';
import { StarsRatingComponent } from '../../shared/components/stars-rating/stars-rating.component';
import { ContentReviewPageComponent } from './pages/content-review-page/content-review-page.component';
import { ContentFeedPageComponent } from './pages/content-feed-page/content-feed-page.component';
import { CommentCardComponent } from 'src/app/shared/components/comment-card/comment-card.component';
import { ContentReviewerPageComponent } from './pages/content-reviewer-page/content-reviewer-page.component';
import { ContentAddReviewPageComponent } from './pages/content-add-review-page/content-add-review-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentClient, ContentClient, ReviewClient } from 'src/app/core/proxies/mkw-api.proxy';
import { ReviewService } from 'src/app/core/services/review.service';
import { HeaderBackComponent } from 'src/app/shared/components/header-back/header-back.component';
import { ContentService } from 'src/app/core/services/content.service';
import { CommentService } from 'src/app/core/services/comment.service';

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
    path: 'reviewer/:id',
    component: ContentReviewerPageComponent
  },
  {
    path: 'add-review/:contentId/:platformId',
    component: ContentAddReviewPageComponent
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
    ContentAddReviewPageComponent
  ],
  imports: [
    CommonModule, 
    IonicModule, 
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(parentRoute),
    CommentCardComponent,
    HeaderBackComponent
  ],
  exports: [ContentComponent],
  providers: [
    ReviewClient,
    ReviewService,
    ContentClient,
    ContentService,
    CommentClient,
    CommentService
  ]
})

export class ContentModule { }