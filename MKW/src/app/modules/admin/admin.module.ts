import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdminComponent } from './admin.component';
import { patch } from '@ngxs/store/operators';
import { AdminFeedComponent } from './pages/admin-feed/admin-feed.component';
import { ReportClient } from 'src/app/core/proxies/mkw-api.proxy';
import { ReportService } from 'src/app/core/services/report.service';
import { ReportListItemCardComponent } from './components/report-list-item-card/report-list-item-card.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportFacade } from 'src/app/shared/facades/report.facade';
import { NgxsModule } from '@ngxs/store';
import { ReportState } from 'src/app/shared/store/report/report.state';


const childrenRoutes: Routes = [
  {
    path: 'admin-feed',
    component: AdminFeedComponent
  },
  {
    path: '', redirectTo: 'admin-feed', pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminFeedComponent,
    ReportListItemCardComponent,
    ReportListComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: childrenRoutes
      }
    ]),
    IonicModule.forRoot(),
    NgxsModule.forFeature([ReportState])

  ],
  providers: [
    ReportClient,
    ReportService,
    ReportFacade
  ]
})
export class AdminModule { }
