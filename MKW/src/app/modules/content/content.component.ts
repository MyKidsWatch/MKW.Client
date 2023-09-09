import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';

import { ContentCard } from 'src/app/shared/models/content-card.model';
import { ContentUtils } from 'src/app/core/Util/ContentUtils';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {

  constructor() {
  }


}