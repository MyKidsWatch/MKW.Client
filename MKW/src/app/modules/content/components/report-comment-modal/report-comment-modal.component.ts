import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-report-comment-modal',
  templateUrl: './report-comment-modal.component.html',
  styleUrls: ['./report-comment-modal.component.scss'],
})
export class ReportCommentModalComponent  implements OnInit {

  constructor(
    private modalController: ModalController, 
    private reportService: ReportService,
    private translateService: TranslateService
  ) {}

  public reportReasons: ReportReasons[] = [];
  
  public reportReasonId?: number;
  ngOnInit() {
    this.reportService.getReportOptions().pipe(take(1)).subscribe({
      next: (res) =>{
        this.reportReasons = [];
        res.content?.forEach(reportReason =>{
            this.reportReasons.push({
              id: reportReason.reasonId,
              reasonTitle: reportReason.title,
            });
        })
      },
      error: (err) =>{
        alert(this.translateService.instant('genericError'));
        this.modalController.dismiss(null, 'cancel')
      }
    })

  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalController.dismiss(this.reportReasonId, 'report');
  }

  handleChange(e: any)
  {
    this.reportReasonId = e.target.value as number;
  }
}


export interface ReportReasons{
  id?: number;
  reasonTitle?: string | null;
}