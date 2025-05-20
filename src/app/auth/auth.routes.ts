import { Routes } from '@angular/router'; 
import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './views/not-found/not-found.component';  

export default [
    { path: 'not-found', component: NotFoundComponent }, 
    { path: 'login', component: LoginComponent}
] as Routes;
