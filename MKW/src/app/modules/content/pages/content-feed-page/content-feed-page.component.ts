import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';
import { MovieService } from 'src/app/core/services/movie.service';
import { ContentCard } from 'src/app/shared/models/content-card.model';

@Component({
  selector: 'app-content-feed-page',
  templateUrl: './content-feed-page.component.html',
  styleUrls: ['./content-feed-page.component.scss'],
})
export class ContentFeedPageComponent  implements OnInit {

  public movieObject?: ContentCard
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

          this.movieObject = ContentUtils.algorithmToContentCard(res.content[0])!;
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
