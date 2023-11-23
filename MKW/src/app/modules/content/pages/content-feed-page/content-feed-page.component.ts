import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { ContentService } from 'src/app/core/services/content.service';
import { ContentCard } from 'src/app/shared/models/content-card.model';
import { ReviewAddModalComponent } from '../../components/review-add-modal/review-add-modal.component';
import { ReviewFacade } from 'src/app/shared/facades/review.facade';
import { Actions, ofActionCompleted } from '@ngxs/store';
import { CreateReview } from 'src/app/shared/store/review/review.actions';

@Component({
  selector: 'app-content-feed-page',
  templateUrl: './content-feed-page.component.html',
  styleUrls: ['./content-feed-page.component.scss'],
})
export class ContentFeedPageComponent implements OnInit {
  public contentObject?: ContentCard | null
  public loading: boolean = true;

  private contentId: string = '';
  private platformId: number = 1;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private reviewFacade: ReviewFacade,
    private modalController: ModalController,
    private actions: Actions,
    private router: Router
  ) { }

  ngOnInit() {
    this.contentId = this.route.snapshot.paramMap.get('contentId')!;
    this.platformId = Number(this.route.snapshot.paramMap.get('platformId')!);

    console.log(this.contentId)
    this.contentService.getContentByExternalId(this.contentId, this.platformId)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res);
          let contentData = res;
          this.contentObject = ContentUtils.ContentDetailsDTOToContentCard(contentData);
          console.log(this.contentObject);

          this.loading = false
        },
        error: (err) => {
          console.log(err);
        }
      })


    this.actions
      .pipe(ofActionCompleted(CreateReview))
      .subscribe(res => {
        setTimeout(() => {
          let reviewNumber = this.reviewFacade.getCurrentReviewId();
          this.router.navigate([`home/content/review/${reviewNumber}`]);
        }, 500)
      })
  }

  async goToReviewPage(contentId: any, platformId: any) {
    const modal = await this.modalController.create({
      component: ReviewAddModalComponent,
      componentProps: {
        contentName: this.contentObject?.title,
        contentPicturePath: this.contentObject?.picturePath
      }
    })

    modal.present();

    let result = await modal.onWillDismiss();

    console.log(result);
    if (result.data === null || result.role == "cancel")
      return;

    this.reviewFacade.createReview(contentId, platformId, result.data.title, result.data.stars, result.data.text);
  }

  goBack() {
    window.history.back();
  }
}
