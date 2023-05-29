import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { ObjectBaseResponseDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { AlgorithmService } from 'src/app/core/services/algorithm.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCard } from 'src/app/shared/models/content-card.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent  implements OnInit {

  public contentCards: ContentCard[] = [];

  public showContent: boolean = this.contentCards.length > 0;
  constructor(private algorithmService: AlgorithmService) { }

  ngOnInit() {      
  } 

  ionViewDidEnter(){
    this.searchAlgorithm();
  }

  searchAlgorithm()
  {
    this.algorithmService.getUserFeed().pipe(take(1)).subscribe({
      next: (response) =>{
          this.transformResponseIntoContentCards(response)
      },
      error: (err) =>{
          console.log(err);
      }
    });
  }

  transformResponseIntoContentCards(response: ObjectBaseResponseDTO)
  { 
      this.contentCards = [];
      response.content!.forEach((element: any) =>{
          this.contentCards.push(ContentUtils.algorithmToContentCard(element));
      })
      this.showContent = this.contentCards.length > 0
  }
}
