import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ActivateEmailComponent } from './activate-email/activate-email.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./../profile/profile.module').then(m => m.ProfileModule)

      },
      {
        path: 'search',
        canActivate: [AuthGuard],
        loadChildren: () => import('./../search/search.module').then(m => m.SearchModule)

      },
      {
        path: 'content',
        canActivate: [AuthGuard],
        loadChildren: () => import('./../content/content.module').then(m => m.ContentModule)

      },
      {
        path: 'feed',
        canActivate: [AuthGuard],
        loadChildren: () => import('./../feed/feed.module').then(m => m.FeedModule)

      }
    ],
  },
  {
    path: 'activate-email',
    component: ActivateEmailComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    ActivateEmailComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule.forRoot()

  ]
})
export class HomeModule { }
