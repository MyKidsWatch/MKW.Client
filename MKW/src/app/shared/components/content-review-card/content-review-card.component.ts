import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ContentReviewCard } from '../../models/content-review-card.model';

@Component({
  selector: 'app-content-review-card',
  templateUrl: './content-review-card.component.html',
  styleUrls: ['./content-review-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule, RouterModule]
})
export class ContentReviewCardComponent  implements OnInit {

  @Input() contentData?: ContentReviewCard;

  constructor() { }

  ngOnInit() {}

}
