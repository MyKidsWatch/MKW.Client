import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed.component';
import { IonicModule } from '@ionic/angular';
import { ContentCardComponent } from '../../shared/components/content-card/content-card.component'
import { TranslateModule } from '@ngx-translate/core';
import { AlgorithmClient, ChildClient, ReportClient, ReviewClient } from 'src/app/core/proxies/mkw-api.proxy';
import { AlgorithmService } from 'src/app/core/services/algorithm.service';
import { ReviewFeedComponent } from './pages/review-feed/review-feed.component';
import { ContentFeedComponent } from './pages/content-feed/content-feed.component';
import { ContentReviewCardComponent } from 'src/app/shared/components/content-review-card/content-review-card.component';
import { ReviewService } from 'src/app/core/services/review.service';
import { ChildService } from 'src/app/core/services/child.service';
import { ChildResolver } from 'src/app/core/resolvers/child.resolver';

const childrenRoutes: Routes = [
  {
    path: 'review-feed',
    component: ReviewFeedComponent,
    resolve: [ChildResolver]
  },
  {
    path: 'content-feed',
    component: ContentFeedComponent
  },
  {
    path: '',
    redirectTo: 'review-feed',
    pathMatch: 'full'
  }
];

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
    children: childrenRoutes
  }
];

@NgModule({
  declarations: [
    FeedComponent,
    ReviewFeedComponent,
    ContentFeedComponent,
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    TranslateModule,
    RouterModule.forChild(routes),
    ContentCardComponent,
    ContentReviewCardComponent,
  ],
  providers: [
    AlgorithmClient,
    AlgorithmService,
    ReportClient,
    ReviewClient,
    ReviewService,
    ChildClient,
    ChildService,
  ]
})
export class FeedModule { }
