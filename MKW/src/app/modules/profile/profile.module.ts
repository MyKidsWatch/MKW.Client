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

const childrenRoutes: Routes = [
  {
      path: '',
      component: ViewProfileComponent,
      canActivate: []
  },
  {
    path: 'children',
    component: ViewChildrenComponent
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
    HeaderBackComponent
    
  ],
  providers: [
    
  ]
})
export class ProfileModule { }
