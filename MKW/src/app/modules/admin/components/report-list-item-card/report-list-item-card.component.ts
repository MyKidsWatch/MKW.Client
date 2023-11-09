import { Component, OnInit, Input } from '@angular/core';
import { ReportListItem } from '../../model/report-list-item.model';
import { stat } from 'fs';
import { ReportFacade } from 'src/app/shared/facades/report.facade';

@Component({
  selector: 'app-report-list-item-card',
  templateUrl: './report-list-item-card.component.html',
  styleUrls: ['./report-list-item-card.component.scss'],
})
export class ReportListItemCardComponent  implements OnInit {

  @Input() reportListItem?: ReportListItem;
  constructor(private reportFacade: ReportFacade){}
  ngOnInit() {}


  mapStatusToDot(status: number | undefined)
  {
    let className = 'dot-unavailable'

    if(status == 1)
      className = 'dot-error'

    if(status == 2)
    className = 'dot-warning'
    
    if(status == 3)
    className = 'dot-normal'
  

    return className;
  }

  selectReport()
  {
    this.reportFacade.setCurrentReport(this.reportListItem!.reportId)
  }
}
