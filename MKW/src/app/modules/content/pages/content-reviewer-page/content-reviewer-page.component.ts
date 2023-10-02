import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-reviewer-page',
  templateUrl: './content-reviewer-page.component.html',
  styleUrls: ['./content-reviewer-page.component.scss'],
})
export class ContentReviewerPageComponent  implements OnInit {
  public loading: boolean = false;
  
  constructor() { }

  ngOnInit() {}

}
