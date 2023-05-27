import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path: '',
        component: SearchComponent
      }
    ]),
    IonicModule.forRoot()
  ]
})
export class SearchModule { }
