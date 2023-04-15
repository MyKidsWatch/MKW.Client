import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../shared/core/services/movie.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage implements OnInit{
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
      this.movieService.getMovie()
      .subscribe({
        next: () =>{
          console.log("Successfully made a call");
        },
        error: () =>{
          console.log("Error while making call");
        }
      })
  }


}
