import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)

  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
  
];
