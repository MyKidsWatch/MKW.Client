import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './content.component';
import { StarsRatingComponent } from '../../shared/components/stars-rating/stars-rating.component';

const routes: Routes = [
  {
    path: ':id',
    component: ContentComponent
  }
];

@NgModule({
  declarations: [ContentComponent, StarsRatingComponent],
  imports: [
    CommonModule, 
    IonicModule, 
    RouterModule.forChild(routes)
  ],
  exports: [ContentComponent]
})

export class ContentModule { }