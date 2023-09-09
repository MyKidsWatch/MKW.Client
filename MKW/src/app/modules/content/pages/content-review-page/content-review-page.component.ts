import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCard } from 'src/app/shared/models/content-card.model';
import { ContentReviewPage } from '../../models/content-review-page.model';

@Component({
  selector: 'app-content-review-page',
  templateUrl: './content-review-page.component.html',
  styleUrls: ['./content-review-page.component.scss'],
})
export class ContentReviewPageComponent  implements OnInit {

  public contentObject?: ContentReviewPage;

  public loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService
      .getMovieById(id)
      .subscribe({
        next: (res: any) => {

          console.log(res);
          this.contentObject = ContentUtils.ContentReviewToPage(res.content[0])!;

        
          this.loading = false;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

  goBack() {
    window.history.back();
  }
}
