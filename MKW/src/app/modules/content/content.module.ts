import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ContentComponent } from './content.component';
import { StarsRatingComponent } from '../../shared/components/stars-rating/stars-rating.component';
import { ContentReviewPageComponent } from './pages/content-review-page/content-review-page.component';
import { ContentFeedPageComponent } from './pages/content-feed-page/content-feed-page.component';
import { CommentCardComponent } from 'src/app/shared/components/comment-card/comment-card.component';
import { ContentReviewerPageComponent } from './pages/content-reviewer-page/content-reviewer-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: ContentComponent
  },
  {
    path: 'review/:id',
    component: ContentReviewPageComponent
  },
  {
    path: 'reviewer/:id',
    component: ContentReviewerPageComponent
  }
];

@NgModule({
  declarations: [ContentComponent, StarsRatingComponent, ContentReviewPageComponent, ContentFeedPageComponent, ContentReviewerPageComponent],
  imports: [
    CommonModule, 
    IonicModule, 
    TranslateModule,
    RouterModule.forChild(routes),
    CommentCardComponent
  ],
  exports: [ContentComponent]
})

export class ContentModule { }