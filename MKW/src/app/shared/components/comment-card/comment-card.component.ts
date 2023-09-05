import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Content } from 'src/app/core/proxies/mkw-api.proxy';
import { ContentReviewComment } from 'src/app/modules/content/models/content-review-page.model';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule, RouterModule]
})
export class CommentCardComponent  implements OnInit {


  
  @Input() commentModel: ContentReviewComment = {
    commentAuthor: {userName: '' , profilePictureUrl: ''},
    commentId: 0,
    commentResponses: [],
    parentCommentId: 0,
    commentText: ''
  };
  
  constructor() { }

  ngOnInit() {}

}
