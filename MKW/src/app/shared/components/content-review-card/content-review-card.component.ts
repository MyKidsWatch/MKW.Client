import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { ContentReviewCard } from '../../models/content-review-card.model';

@Component({
  selector: 'app-content-review-card',
  templateUrl: './content-review-card.component.html',
  styleUrls: ['./content-review-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule, RouterModule]
})
export class ContentReviewCardComponent implements OnInit {

  @Input() contentData?: ContentReviewCard;

  public dateFormat: string;

  constructor(private router: Router, private translateService: TranslateService) {
    let currentLanguage = this.translateService.currentLang;

    this.dateFormat = currentLanguage === 'pt-BR' ? 'dd/MM/yyyy' : 'MM/dd/yyyy';
  }

  redirectToContentReviewPage(contentId: number) {
    this.router.navigate([`home/content/review/${contentId}`]);
  }

  ngOnInit() { }
}
