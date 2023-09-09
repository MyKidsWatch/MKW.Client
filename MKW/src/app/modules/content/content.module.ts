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
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewClient } from 'src/app/core/proxies/mkw-api.proxy';
import { ReviewService } from 'src/app/core/services/review.service';

const routes: Routes = [
  {
    path: 'feed/:id',
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
    path: 'add-review',
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
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(parentRoute),
    CommentCardComponent
  ],
  exports: [ContentComponent],
  providers: [
    ReviewClient,
    ReviewService
  ]
})

export class ContentModule { }