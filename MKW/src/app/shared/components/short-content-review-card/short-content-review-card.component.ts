import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { ContentReviewCard } from '../../models/content-review-card.model';

@Component({
  selector: 'app-short-content-review-card',
  templateUrl: './short-content-review-card.component.html',
  styleUrls: ['./short-content-review-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule, RouterModule]
})
export class ShortContentReviewCardComponent implements OnInit {
  @Input() contentData?: ContentReviewCard;

  constructor(private router: Router) { }

  redirectToContentReviewPage(contentId: number) {
    this.router.navigate([`home/content/review/${contentId}`]);
  }

  ngOnInit() {}
}
