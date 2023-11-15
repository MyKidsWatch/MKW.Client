import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { take } from 'rxjs';
import { AccountUtils } from 'src/app/core/Util/AccountUtil';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { ChildDtoBaseResponseDTO, ObjectBaseResponseDTO, ReviewDetailsDto, ReviewDetailsDtoBaseResponseDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { AlgorithmService } from 'src/app/core/services/algorithm.service';
import { ChildService } from 'src/app/core/services/child.service';
import { LoadingBarService } from 'src/app/core/services/loading-bar.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { ReviewService } from 'src/app/core/services/review.service';
import { ChildrenCard } from 'src/app/shared/models/children-card.model';
import { ContentCard } from 'src/app/shared/models/content-card.model';
import { ContentReviewCard } from 'src/app/shared/models/content-review-card.model';

@Component({
  selector: 'app-review-feed',
  templateUrl: './review-feed.component.html',
  styleUrls: ['./review-feed.component.scss']
})
export class ReviewFeedComponent implements OnInit {

  public contentCards: ContentReviewCard[] = [];
  public page: number = 1;
  public pageSize: number = 10;
  public isLoadingContent: boolean = false;
  public showContent: boolean = true;
  public childId?:number;
  public children:ChildrenCard[] = [];

  constructor(
    private reviewService: ReviewService,
    private childService: ChildService,
    public loadingBarService: LoadingBarService
    ) { }

  ngOnInit() {
    this.setLoadingBar();
  }

  setLoadingBar() {
    this.loadingBarService.getLoadingBar().subscribe((response) => {
      this.isLoadingContent = response as boolean;
    })
  }

  ionViewDidEnter() {
    this.showContent = true;
    this.getChildren();
    if (this.contentCards.length == 0)
      this.searchAlgorithm();
  }

  searchAlgorithm() {
    this.reviewService.getRelevantReviews(this.page, this.pageSize, this.childId)
      .pipe(take(1))
      .subscribe(
        {
          next: (response) => {
            if (!response.content || response.content!.length == 0 && this.contentCards.length == 0)
              this.showContent = false;
            else
              this.transformResponseIntoContentCards(response);
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
  }


  transformResponseIntoContentCards(response: ReviewDetailsDtoBaseResponseDTO) {
    console.log(response);
    response.content!.forEach((element: ReviewDetailsDto) => {
      let contentCard = ContentUtils.relevantReviewToContentReviewCard(element);

      if (contentCard)
        this.contentCards.push(contentCard);
    })
    this.showContent = this.contentCards.length > 0
  }

  onIonInfinite(event: any) {
    if (this.page < 10) {
      this.page++;
      this.searchAlgorithm();
    }

    (event as InfiniteScrollCustomEvent).target.complete();

  }

  handleRefresh(event: any) {
    this.contentCards = [];
    this.page = 1;
    this.searchAlgorithm();
    event.target.complete();
  }

  selectChildId(childId?: number)
  {
    this.childId = childId;
    this.contentCards = [];
    this.page = 1;
    this.searchAlgorithm();
  }

  getChildren() {
    this.children = [];
    this.childService.getChildren().pipe(take(1)).subscribe({
      next: (response) =>{
        this.buildChildrenCards(response)
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  buildChildrenCards(childrenResponse: ChildDtoBaseResponseDTO)
  {
      childrenResponse.content?.forEach(children =>{
        let gender = AccountUtils.getGenderString(children.genderId);

        this.children.push(
          {
            ageRange: AccountUtils.getAgeRangeStringSimplified(children.ageRangeId), 
            id: children.id!, 
            style: gender ? gender : 'unassigned', 
            gender
          })
      });
  }
}
