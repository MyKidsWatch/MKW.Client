import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { IonicModule } from '@ionic/angular';
import { MovieClient } from 'src/app/core/proxies/mkw-api.proxy';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCardComponent } from 'src/app/shared/components/content-card/content-card.component';



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
    IonicModule.forRoot(),
    ContentCardComponent
  ],
  providers: [
    MovieClient,
    MovieService
  ]
})
export class SearchModule { }
