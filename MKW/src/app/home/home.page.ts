import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../shared/core/services/movie.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SplashScreenService } from '../shared/core/services/splash-screen.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, TranslateModule],
})


export class HomePage implements OnInit{
  public movieId = new FormControl('');
  public movieObject?: any;
  
  constructor(
    private movieService: MovieService,
    private translate: TranslateService,
    private splashService: SplashScreenService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    setTimeout(() => {
      this.splashService.stop();
    }, 3000);

  }

  getMovie() {
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

  changeLanguage() {
    const lang = this.translate.currentLang === 'pt' ? 'en' : 'pt';
    this.translate.use(lang);
  }

  loginPage()
  {
    this.router.navigate(['/auth'])
  }
}
