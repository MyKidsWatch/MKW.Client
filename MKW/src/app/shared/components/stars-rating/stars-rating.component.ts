import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.scss'],
})
export class StarsRatingComponent  implements OnInit {
  @Input() rating: number = 0;
  
  constructor() { }
  
  ngOnInit() {}
  
}
