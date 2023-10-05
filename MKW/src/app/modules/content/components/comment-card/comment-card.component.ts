import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonInput, IonicModule, ViewDidEnter } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { Content } from 'src/app/core/proxies/mkw-api.proxy';
import { ContentReviewComment } from 'src/app/modules/content/models/content-review-page.model';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/shared/store/state/user.state';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent  implements OnInit {

  public newComment = '';
  public isAnswering: boolean = false;
  public currentUsername?: string = '';
  @ViewChild('answer', { static: false }) answerInput?: IonInput;

  @Output() commentAnswered: EventEmitter<AnswerEvent> = new EventEmitter(); 
  @Output() commentReported: EventEmitter<ReportEvent> = new EventEmitter(); 
  @Output() commentEdited: EventEmitter<EditEvent> = new EventEmitter(); 
  @Output() commentDeleted: EventEmitter<number> = new EventEmitter(); 

  @Input() commentModel: ContentReviewComment = {
    commentAuthor: {userName: '' , profilePictureUrl: ''},
    commentId: 0,
    commentResponses: [],
    parentCommentId: 0,
    commentText: ''
  };
  

  constructor(private store: Store) { }

  ngOnInit() {
    this.currentUsername = this.store.selectSnapshot(UserState.getUser)?.username;
    console.log(this.currentUsername);  
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


  deleteComment()
  {

  }

  editComment()
  {

  }
}


export class ReportEvent{
  constructor(){}

  commentId?: number;
  reasonId?: number;
}

export class EditEvent{
  constructor(){}

  commentId?: number;
  nextText?: string;
}

export class AnswerEvent{
  
  constructor(){}

  commentId?: number;
  answerText?: string;

}
