import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCardComponent } from 'src/app/shared/components/content-card/content-card.component';
import { take, pipe, Observable, elementAt } from 'rxjs';
import { ContentCard } from 'src/app/shared/models/content-card.model';
import { ContentListItemDTO, ContentListItemDTOBaseResponseDTO, ObjectBaseResponseDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { ContentService } from 'src/app/core/services/content.service';
import { nextTick } from 'process';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {

  public contentCards: ContentCard[] = [];
  constructor(private movieService: MovieService, private contentService: ContentService) { }

  ngOnInit() {}


  searchBarInput(event: any)
  {
      let text = event.target.value;

      if(text.length >= 3)
      {
        this.contentService.searchContentByName(text, undefined).pipe(take(1))
        .subscribe({
          next: (response) =>{
            this.transformResponseIntoContentCards(response)
          },
          error: (err) =>{
            console.log(err)
          }
        })
      }
      else if(text.length == 0)
      {
          this.contentCards = [];
      }
  }

  transformResponseIntoContentCards(response: ContentListItemDTOBaseResponseDTO){

    this.contentCards = [];
    
    response.content?.forEach(element =>{
        let contentCard = ContentUtils.ContentDTOResponseToContentCard(element);
        if(contentCard != null)
          this.contentCards.push(contentCard);
    });

  }

}
