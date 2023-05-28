import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  public movieObject?: any;
  public loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService
      .getMovie(id)
      .subscribe({
        next: (res: any) => {
          this.movieObject = res;
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