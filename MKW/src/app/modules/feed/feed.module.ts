import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed.component';
import { IonicModule } from '@ionic/angular';
import { ContentCardComponent } from '../../shared/components/content-card/content-card.component'
import { TranslateModule } from '@ngx-translate/core';
import { AlgorithmClient, MovieClient, Review } from 'src/app/core/proxies/mkw-api.proxy';
import { AlgorithmService } from 'src/app/core/services/algorithm.service';
import { ReviewFeedComponent } from './pages/review-feed/review-feed.component';
import { ContentFeedComponent } from './pages/content-feed/content-feed.component';

const childrenRoutes: Routes = [
  {
    path: 'review-feed',
    component: ReviewFeedComponent
  },
  {
    path: 'content-feed',
    component: ContentFeedComponent
  },
  { path: '',   redirectTo: 'review-feed', pathMatch: 'full' }
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
    ContentFeedComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    TranslateModule,
    RouterModule.forChild(routes),
    ContentCardComponent
  ],
  providers:[
    AlgorithmClient,
    AlgorithmService
  ]
})
export class FeedModule { }
