import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { take } from 'rxjs';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { ObjectBaseResponseDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { AlgorithmService } from 'src/app/core/services/algorithm.service';
import { LoadingBarService } from 'src/app/core/services/loading-bar.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCard } from 'src/app/shared/models/content-card.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent  implements OnInit {

  public contentCards: ContentCard[] = [];
  public page: number = 1;
  public pageSize: number = 10;
  public isLoadingContent: boolean = false;
  public showContent: boolean = this.contentCards.length > 0;
  constructor(private algorithmService: AlgorithmService, public loadingBarService: LoadingBarService) { }

  ngOnInit() {   
    this.setLoadingBar();       
  } 

  setLoadingBar()
  {
    this.loadingBarService.getLoadingBar().subscribe((response) =>{
      this.isLoadingContent = response as boolean;
    })
  }

  ionViewDidEnter(){
    if(this.contentCards.length == 0)
      this.searchAlgorithm();
  }

  searchAlgorithm()
  {
    this.algorithmService.getUserFeed(this.page, this.pageSize).pipe(take(1)).subscribe({
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
      response.content!.forEach((element: any) =>{
          this.contentCards.push(ContentUtils.algorithmToContentCard(element));
      })
      this.showContent = this.contentCards.length > 0
  }

  onIonInfinite(event: any)
  {
    if(this.page < 10)
    {
      this.page++;
      this.searchAlgorithm();
    }

    (event as InfiniteScrollCustomEvent).target.complete();

  }

  handleRefresh(event: any)
  {
      this.page = 1;
      this.searchAlgorithm();
      event.target.complete();
  }
}
