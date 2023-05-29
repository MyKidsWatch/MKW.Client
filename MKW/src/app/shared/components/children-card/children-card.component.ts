import { Component, OnInit, Input } from '@angular/core';
import { ChildrenCard } from '../../models/children-card.model';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-children-card',
  templateUrl: './children-card.component.html',
  styleUrls: ['./children-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class ChildrenCardComponent  implements OnInit {

  @Input() childrenCard?: ChildrenCard;

  ngOnInit() {}

}
