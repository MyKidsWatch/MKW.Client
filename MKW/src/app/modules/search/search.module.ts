import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path: '',
        component: SearchComponent
      }
    ])
  ]
})
export class SearchModule { }
