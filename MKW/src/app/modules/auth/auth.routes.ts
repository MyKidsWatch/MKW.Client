import { Route, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AuthResolver } from 'src/app/core/resolvers/auth.resolver';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';


const childrenRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
        resolve: [AuthResolver]
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    }
]
export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: childrenRoutes
    }
];
