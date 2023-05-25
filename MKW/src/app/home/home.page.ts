import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../core/services/movie.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SplashScreenService } from '../core/services/splash-screen.service';
import { Router } from '@angular/router';
import { RemoveUser, SaveUser } from '../shared/store/actions/user.action';
import { Select, Store } from '@ngxs/store';

import { UserData, TokenInfo } from '../shared/store/models/user.model';
import { UserState, UserStateModel } from '../shared/store/state/user.state';
import { Observable } from 'rxjs';


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
  public user?: UserData;

  constructor(
    private movieService: MovieService,
    private translate: TranslateService,
    private splashService: SplashScreenService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void { 
    this.syncData();
  }

  syncData()
  {
    this.store.select(state => state).subscribe((response) =>{
      this.user = response.userState.user; 
    })
  }

  getMovie() {
    if(this.movieId.value == null)
      return;

    this.movieService.getMovie(Number(this.movieId.value))
    .subscribe({
      next: (res: any) =>{
        this.movieObject = res;
      },
      error: (err: any) =>{
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


  setUser()
  {
    let payload: UserData = {
        username: 'Felipe Domingues Bonfim',
        isEmailVerified: true,
        isPremium: false,
        token: {
          accessToken: 'abc123',
          expiresAt: new Date(),
          refreshToken: 'abc'
        }

    };

    this.store.dispatch(new SaveUser(payload));
  }

  removeUser()
  {
    this.store.dispatch(new RemoveUser());
  }
}

