import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedComponent } from './feed.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path: '',
        component: FeedComponent
      }
    ])
  ]
})
export class FeedModule { }
