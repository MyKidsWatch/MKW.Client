import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-admin-feed',
  templateUrl: './admin-feed.component.html',
  styleUrls: ['./admin-feed.component.scss'],
})
export class AdminFeedComponent  implements OnInit {

  constructor(private reportService: ReportService) { }

  ngOnInit() {

    this.reportService.getReportFeed()
    .subscribe({
      next: (res) =>{
        console.log(res);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

}
