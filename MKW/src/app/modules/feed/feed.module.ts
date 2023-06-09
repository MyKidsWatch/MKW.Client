import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedComponent } from './feed.component';
import { IonicModule } from '@ionic/angular';
import { ContentCardComponent } from '../../shared/components/content-card/content-card.component'
import { TranslateModule } from '@ngx-translate/core';
import { AlgorithmClient, MovieClient } from 'src/app/core/proxies/mkw-api.proxy';
import { AlgorithmService } from 'src/app/core/services/algorithm.service';


@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    TranslateModule,
    RouterModule.forChild([
      { 
        path: '',
        component: FeedComponent
      }
    ]),
    ContentCardComponent
  ],
  providers:[
    AlgorithmClient,
    AlgorithmService
  ]
})
export class FeedModule { }
