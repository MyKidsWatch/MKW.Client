import { Route, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const childrenRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
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
