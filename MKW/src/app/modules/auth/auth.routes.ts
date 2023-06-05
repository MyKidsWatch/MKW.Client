import { Route, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const childrenRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sign-up',
        component: SignUpComponent

    }
]
export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: childrenRoutes
    }
];
