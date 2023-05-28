import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AlgorithmService } from 'src/app/core/services/algorithm.service';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent  implements OnInit {

  public showContent: boolean = false
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
          console.log(response)
      },
      error: (err) =>{
          console.log(err);
      }
    });
  }
}
