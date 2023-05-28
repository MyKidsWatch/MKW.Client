import { Component, OnInit } from '@angular/core';
import { ChildrenCard } from 'src/app/shared/models/children-card.model';

@Component({
  selector: 'app-view-children',
  templateUrl: './view-children.component.html',
  styleUrls: ['./view-children.component.scss'],
})
export class ViewChildrenComponent  implements OnInit {

  public childrenCards: ChildrenCard[] = [];
  constructor() { 
    this.childrenCards.push({ageRange: '7 a 9 anos', id: 0, style: 'boy', gender: 'Menino'})
    this.childrenCards.push({ageRange: '7 a 9 anos', id: 0, style: 'girl', gender: 'Menina'})
    this.childrenCards.push({ageRange: '7 a 9 anos', id: 0, style: 'undefined'})
  }

  ngOnInit() {}

  showChildrenId(childrenCard: ChildrenCard)
  {
      console.log(childrenCard.id);
  }
}
