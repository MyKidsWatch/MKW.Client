import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class HeaderBackComponent  implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {}

  goBack()
  {
    this.location.back();
  }
}
