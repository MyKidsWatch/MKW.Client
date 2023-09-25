import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { ContentService } from 'src/app/core/services/content.service';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCard } from 'src/app/shared/models/content-card.model';

@Component({
  selector: 'app-content-feed-page',
  templateUrl: './content-feed-page.component.html',
  styleUrls: ['./content-feed-page.component.scss'],
})
export class ContentFeedPageComponent  implements OnInit {

  public contentObject?: ContentCard | null
  public loading: boolean = true;

  private contentId: string = '';
  private platformId: number = 1;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private router: Router
  ) {}

  ngOnInit() {

    this.contentId = this.route.snapshot.paramMap.get('contentId')!;
    this.platformId = Number(this.route.snapshot.paramMap.get('platformId')!);

    console.log(this.contentId)
    this.contentService.getContentByExternalId(this.contentId, this.platformId)
    .pipe(take(1))
    .subscribe({
      next: (res) =>{

        console.log(res);
        let contentData = res;
        this.contentObject = ContentUtils.ContentDetailsDTOToContentCard(contentData);
    
        this.loading = false
      },
      error: (err) =>{
        console.log(err);
      }
    })

  }


  goToReviewPage(contentId: any, platformId: any)
  {

    this.router.navigate(['home/content/add-review', contentId, platformId])
  }

  goBack() {
    window.history.back();
  }
}
