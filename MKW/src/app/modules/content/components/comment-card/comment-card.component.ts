import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonInput, IonicModule, ModalController, ViewDidEnter } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { Content } from 'src/app/core/proxies/mkw-api.proxy';
import { ContentReviewComment } from 'src/app/modules/content/models/content-review-page.model';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/shared/store/user/user.state';
import { CommentFacade } from 'src/app/shared/facades/comment.facade';
import { ReportService } from 'src/app/core/services/report.service';
import { ReportComment } from 'src/app/shared/store/comments/comment.actions';
import { ReportCommentModalComponent } from '../report-comment-modal/report-comment-modal.component';
import { EditCommentModalComponent } from '../edit-comment-modal/edit-comment-modal.component';
import { take } from 'rxjs';
import { UserSelectors } from 'src/app/shared/store/user/user.selectors';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {

  public newComment = '';
  public isAnswering: boolean = false;
  public currentUsername?: string = '';

  public actionSheetButtons: any[] = [];


  private actionSheetOpNoEdit = [
    {
      text: 'Deletar',
      role: 'destructive',
      data: {
        action: 'delete',
      }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      }
    }
  ]
  private actionSheetOp = [
    {
      text: 'Deletar',
      role: 'destructive',
      data: {
        action: 'delete',
      }
    },
    {
      text: 'Editar',
      data: {
        action: 'edit',
      }
    },

    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      }
    }
  ]

  private actionSheetNotOp = [
    {
      text: 'Denunciar',
      data: {
        action: 'report',
      }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      }
    }
  ]

  @ViewChild('answer', { static: false }) answerInput?: IonInput;



  @Input() commentModel: ContentReviewComment = {
    commentAuthor: { userName: '', profilePictureUrl: '', creatorId: 0 },
    commentId: 0,
    commentResponses: [],
    parentCommentId: 0,
    commentText: '',
    commentIsEdited: false
  };


  constructor(
    private store: Store,
    private commentFacade: CommentFacade,
    private modalController: ModalController) { }

  ngOnInit() {
    this.currentUsername = this.store.selectSnapshot(UserSelectors.getUser)?.username;

    let isOwner = this.currentUsername == this.commentModel.commentAuthor.userName;

    if (!isOwner) {
      this.actionSheetButtons = this.actionSheetNotOp;
    }
    else {
      this.actionSheetButtons = this.commentModel.commentIsEdited ? this.actionSheetOpNoEdit : this.actionSheetOp;
    }

  }

  startAnswering(event: Event) {
    event.stopPropagation();
    this.isAnswering = true;
    if (this.answerInput) {
      this.answerInput.setFocus();
    }
  }


  stopAnswering() {
    if (this.newComment.trim() == '')
      this.isAnswering = false;
  }

  answerComment() {
    this.commentFacade.answerComment(this.newComment, this.commentModel.commentId)
    this.newComment = '';
    this.isAnswering = false;
  }


  deleteComment() {
    this.commentFacade.deleteComment(this.commentModel.commentId);
  }

  reportComment(reasonId: number, commentId: number) {
    this.commentFacade.reportComment(reasonId, commentId, this.commentModel.commentAuthor.creatorId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          alert("Comentário denunciado com sucesso.");
        },
        error: () => {
          alert("Erro ao denunciar comentário")
        }
      })
  }


  async openReportModal() {
    const modal = await this.modalController.create({
      component: ReportCommentModalComponent
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role == "report" && data != null)
      this.reportComment(data, this.commentModel.commentId)
  }

  async openEditModal() {
    const modal = await this.modalController.create({
      component: EditCommentModalComponent,
      componentProps: {
        comment: this.commentModel.commentText
      }
    })

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role == "edit" && data != null && data.trim() != '')
      this.commentFacade.editComment(data, this.commentModel.commentId);
  }

  actionSheetEvent(event: any, commentId: number) {
    if (!event.detail.data || !event.detail.data.action)
      return;

    let action = event.detail.data.action;

    switch (action) {
      case 'delete':
        this.deleteComment();
        break;
      case 'edit':
        this.openEditModal();
        break;
      case 'report':
        this.openReportModal();
        break;
    }


  }
}


