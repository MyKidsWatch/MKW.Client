import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { SplashScreenService } from 'src/app/core/services/splash-screen.service';

@Component({
  standalone: true,
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  imports: [
    CommonModule
  ]
})
export class StepperComponent  implements OnInit {

  @Input() currentStep: number = 2;

  constructor() { }

  ngOnInit() {}

}
