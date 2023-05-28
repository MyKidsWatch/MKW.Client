import { Component, OnInit, Input } from '@angular/core';
import { ChildrenCard } from '../../models/children-card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-children-card',
  templateUrl: './children-card.component.html',
  styleUrls: ['./children-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class ChildrenCardComponent  implements OnInit {

  @Input() childrenCard?: ChildrenCard;
  constructor() { }

  ngOnInit() {}

}
