import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';

import { ContentCard } from 'src/app/shared/models/content-card.model';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
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
          this.movieObject = ContentUtils.TMDBToContentCard(res);
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