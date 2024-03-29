import { Component, Input, OnInit } from '@angular/core';
import { ContentCard } from '../../models/content-card.model';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule, RouterModule]
})
export class ContentCardComponent implements OnInit {
  @Input() contentData?: ContentCard;

  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  redirectToContentPage(externalContentId: string, platformId: number) {
    this.router.navigate([`home/content/feed`, externalContentId, platformId]);
  }

  isValidDate() {
    return this.contentData?.releaseDate instanceof Date && !isNaN(this.contentData.releaseDate.valueOf());
  }
}
