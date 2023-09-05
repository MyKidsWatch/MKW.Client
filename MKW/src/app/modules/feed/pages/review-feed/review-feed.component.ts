import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { take } from 'rxjs';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { ObjectBaseResponseDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { AlgorithmService } from 'src/app/core/services/algorithm.service';
import { LoadingBarService } from 'src/app/core/services/loading-bar.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCard } from 'src/app/shared/models/content-card.model';
import { ContentReviewCard } from 'src/app/shared/models/content-review-card.model';

@Component({
  selector: 'app-review-feed',
  templateUrl: './review-feed.component.html',
  styleUrls: ['./review-feed.component.scss'],
})
export class ReviewFeedComponent  implements OnInit {

  public contentCards: ContentReviewCard[] = [];
  public page: number = 1;
  public pageSize: number = 10;
  public isLoadingContent: boolean = false;
  public showContent: boolean = true;
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
    this.showContent = true;
    if(this.contentCards.length == 0)
      this.searchAlgorithm();
  }

  searchAlgorithm()
  {

      let contentReviewCard: ContentReviewCard = {
        reviewId: 1,
        reviewBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel ultrices velit. Nullam convallis tellus a eros lobortis posuere in nec enim. Maecenas molestie turpis sed neque pellentesque efficitur. Praesent consectetur ipsum vitae iaculis iaculis. Nam luctus arcu dui, sed efficitur risus auctor sed. Pellentesque non egestas libero. Phasellus sagittis semper dui ultrices dictum. Sed porta, erat fermentum gravida egestas, risus ligula hendrerit arcu, et imperdiet odio metus non nulla.',
        reviewPublishDate: new Date(2023, 2, 2),
        reviewerInformation: {
          reviewerId: 1,
          reviewerName: "Mommy Makima",
          reviewerPicturePath: "https://i.pinimg.com/736x/b4/88/75/b48875b97a4819d9b44dbd9469f96445.jpg"
        },
        reviewRating: 3.5,
        reviewTitle: "Pocoyo é ____",
        reviewAwardInformation: {
          reviewBronzeAwardCount: 10,
          reviewGoldAwardCount: 20, 
          reviewSilverAwardCount: 30
        },
        reviewCommentCount: 25,
        reviewContentInformation: {
          contentPosterPath: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1fmaC3t96Napg7TR9SsfOX8q11X.jpg',
          contentTitle: "Pocoyo"
        },

      }

      this.contentCards.push(contentReviewCard);
      this.contentCards.push(contentReviewCard);
      this.contentCards.push(contentReviewCard);
      this.contentCards.push(contentReviewCard);
      this.contentCards.push(contentReviewCard);
  //   this.algorithmService.getUserFeed(this.page, this.pageSize).pipe(take(1)).subscribe({
  //     next: (response) =>{

  //         if(!response.content || response.content!.length == 0 && this.contentCards.length == 0)
  //           this.showContent = false;
  //         else
  //           this.transformResponseIntoContentCards(response);

  //     },
  //     error: (err) =>{
  //         console.log(err);
  //     }
  //   });
  }


  transformResponseIntoContentCards(response: ObjectBaseResponseDTO)
  { 
      // response.content!.forEach((element: any) =>{
      //     let contentCard = ContentUtils.algorithmToContentCard(element);
      //     if(contentCard)
      //       this.contentCards.push(contentCard);
      // })
      // this.showContent = this.contentCards.length > 0
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
      this.contentCards = [];
      this.page = 1;
      this.searchAlgorithm();
      event.target.complete();
  }
}
