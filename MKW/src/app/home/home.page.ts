import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../shared/core/services/movie.service';
import { PlatformService } from '../shared/core/services/platform.service';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class HomePage implements OnInit{
  
  public movieId = new FormControl('');

  public movieObject?: any;
  
  constructor(private movieService: MovieService) {}


  ngOnInit(): void {
      
  }


  getMovie()
  {
    if(this.movieId.value == null)
      return;

    this.movieService.getMovie(Number(this.movieId.value))
    .subscribe({
      next: (res) =>{
        this.movieObject = res;
      },
      error: (err) =>{
        alert("Error while making the call")
        console.log("Error while making call");
      }
    })
  }

}
