import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCardComponent } from 'src/app/shared/components/content-card/content-card.component';
import { take, pipe, Observable, elementAt } from 'rxjs';
import { ContentCard } from 'src/app/shared/models/content-card.model';
import { ObjectBaseResponseDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {

  public contentCards: ContentCard[] = [];
  constructor(private movieService: MovieService) { }

  ngOnInit() {}


  searchBarInput(event: any)
  {
      let text = event.target.value;

      if(text.length >= 3)
      {
          this.movieService.getMovieListByName(text).pipe(take(1))
          .subscribe({
            next: (response) =>{
              this.transformResponseIntoContentCards(response);
            },
            error: (err) =>{
                console.log()
            }
          })
      }
  }

  transformResponseIntoContentCards(response: ObjectBaseResponseDTO)
  { 
      this.contentCards = [];
      let content = response.content![0];
      content.results.forEach((element: any) =>{
          this.contentCards.push(ContentUtils.TMDBToContentCard(element));
      })
  }

}
