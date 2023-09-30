import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ContentClient, MovieClient } from 'src/app/core/proxies/mkw-api.proxy';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCardComponent } from 'src/app/shared/components/content-card/content-card.component';
import { ContentService } from 'src/app/core/services/content.service';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
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
    MovieService,
    ContentClient,
    ContentService
  ]
})
export class SearchModule { }
