import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AdminComponent } from './admin.component';
import { patch } from '@ngxs/store/operators';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent
      }
    ]),
    IonicModule.forRoot()
  ]
})
export class AdminModule { }
