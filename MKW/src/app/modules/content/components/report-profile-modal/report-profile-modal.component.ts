import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-report-profile-modal',
  templateUrl: './report-profile-modal.component.html',
  styleUrls: ['./report-profile-modal.component.scss'],
})
export class ReportProfileModalComponent implements OnInit {
  constructor(
    private modalController: ModalController, 
    private reportService: ReportService
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
        alert("Não é possível realizar denuncias no momento");
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