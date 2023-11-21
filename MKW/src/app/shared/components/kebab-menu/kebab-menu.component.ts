import { Component, Input, OnInit } from '@angular/core';
import { KebabMenuItem } from '../../models/kebab-menu-item.model';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-kebab-menu',
  templateUrl: './kebab-menu.component.html',
  styleUrls: ['./kebab-menu.component.scss'],
  imports: [ CommonModule ],
  standalone: true
})
export class KebabMenuComponent  implements OnInit {
  @Input() items: KebabMenuItem[] = [];
  @Input() side: string = 'left';

  public isOpen: boolean = false;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.items = this.items.map(item => {
      item.label = this.translateService.instant(item.label);
      
      return item;
    });

    document.addEventListener('click', (e) => {
      if (!this.isOpen) {
        return;
      }
    
      const target = e.target as HTMLElement;
    
      if (!target.matches('.kebab-menu-button, .kebab-menu-icon, .kebab-menu-item')) {
        this.isOpen = false;
      }
    });
  }

  handleToggle() {
    this.isOpen = !this.isOpen;
  }
}
