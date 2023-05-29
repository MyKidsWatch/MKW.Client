import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { ViewChildrenComponent } from './pages/view-children/view-children.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { HeaderBackComponent } from 'src/app/shared/components/header-back/header-back.component';
import { AddChildrenComponent } from './pages/add-children/add-children.component';
import { EditChildrenComponent } from './pages/edit-children/edit-children.component';
import { ChildrenCardComponent } from 'src/app/shared/components/children-card/children-card.component';
import { AccountClient, AgeRangeClient, ChildClient } from 'src/app/core/proxies/mkw-api.proxy';
import { ChildService } from 'src/app/core/services/child.service';
import { AgeRangeService } from 'src/app/core/services/age-range.service';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileResolver } from 'src/app/core/resolvers/profile.resolver';
import { AccountService } from 'src/app/core/services/account.service';

const childrenRoutes: Routes = [
  {
      path: '',
      component: ViewProfileComponent,
      canActivate: []
  },
  {
    path: 'children',
    component: ViewChildrenComponent,

  },
  {
    path: 'add-children',
    component: AddChildrenComponent
  },
  {
    path: 'edit-children/:id',
    component: EditChildrenComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  }
]
export const routes: Routes = [
  {
      path: '',
      component: ProfileComponent,
      resolve: [ProfileResolver],
      children: childrenRoutes
  }
];


@NgModule({
  declarations: [
    AddChildrenComponent,
    
    EditChildrenComponent,
    EditProfileComponent,
    ProfileComponent,
    ViewProfileComponent,
    ViewChildrenComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(routes),
    HeaderBackComponent,
    ChildrenCardComponent
    
  ],
  providers: [
    ProfileResolver,
    AccountClient,
    AccountService,
    ChildClient,
    ChildService,
    AgeRangeClient,
    AgeRangeService
  ]
})
export class ProfileModule { }
