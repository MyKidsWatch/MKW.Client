import { Component, Input, OnInit } from '@angular/core';
import { ContentCard } from '../../models/content-card.model';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ContentCardComponent  implements OnInit {

  @Input() contentData: ContentCard;

  constructor() { 

    this.contentData = {
      title: "John Wick 4",
      releaseDate: new Date('2023-03-23'),
      averageRating: 4.1,
      contentType: 'Movie',
      description: 'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
      genre: [
        'Action',
        'Thriller',
        'Crime'
      ],
      id: 603692,
      picturePath: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rXTqhpkpj6E0YilQ49PK1SSqLhm.jpg'
  }
  }

  ngOnInit() {
    

  }

}
