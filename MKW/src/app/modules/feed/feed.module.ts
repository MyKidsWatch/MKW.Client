import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedComponent } from './feed.component';
import { IonicModule } from '@ionic/angular';
import { ContentCardComponent } from '../../shared/components/content-card/content-card.component'


@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule.forChild([
      { 
        path: '',
        component: FeedComponent
      }
    ]),
    ContentCardComponent
  ]
})
export class FeedModule { }
