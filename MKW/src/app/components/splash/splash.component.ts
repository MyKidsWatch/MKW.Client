import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SplashScreenService } from 'src/app/core/services/splash-screen.service';

@Component({
  standalone: true,
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  imports: [
    CommonModule
  ]
})
export class SplashComponent  implements OnInit {

  public opacityChange = 1;

  public splashTransition?: string;

  // First access the splash is visible
  public showSplash = true;

  readonly ANIMATION_DURATION = 1;

  constructor(private splashScreenService: SplashScreenService) { }
 
  ngOnInit(): void {  
      this.splashScreenService.subscribe(() => {
        this.toggleSplashAnimation();
      });
  }


  private toggleSplashAnimation() {
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;
 
    setTimeout(() => {
       this.showSplash = false;

    }, 1000);
 }
}
