import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonInput, IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { eventNames } from 'process';
import { Content } from 'src/app/core/proxies/mkw-api.proxy';
import { ContentReviewComment } from 'src/app/modules/content/models/content-review-page.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule, RouterModule, FormsModule]
})
export class CommentCardComponent  implements OnInit{

  public newComment = '';
  public isAnswering: boolean = false;
  @ViewChild('answer', { static: false }) answerInput?: IonInput;

  @Output() commentAnswered: EventEmitter<AnswerEvent> = new EventEmitter(); 

  @Input() commentModel: ContentReviewComment = {
    commentAuthor: {userName: '' , profilePictureUrl: ''},
    commentId: 0,
    commentResponses: [],
    parentCommentId: 0,
    commentText: ''
  };
  

  constructor() { }

  ngOnInit() {
  }

  startAnswering(event: Event)
  {
    event.stopPropagation();
    this.isAnswering = true;
    if (this.answerInput) {
      this.answerInput.setFocus();
    }
  }


  stopAnswering()
  {
    if(this.newComment.trim() == '')
      this.isAnswering = false;
  }

  answerComment()
  {
      let answerEvent = new AnswerEvent();
      answerEvent.answerText = this.newComment;
      answerEvent.commentId = this.commentModel.commentId;

      this.commentAnswered.emit(answerEvent)
      this.newComment = '';
      this.isAnswering = false;
  }
}

export class AnswerEvent{
  
  constructor(){}

  commentId?: number;
  answerText?: string;

}
