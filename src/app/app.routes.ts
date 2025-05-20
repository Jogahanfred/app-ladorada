import { Routes } from '@angular/router'; 
import { PublicLayoutComponent } from './views/public/layout/public-layout.component';
import { LayoutComponent } from './views/auth/layout/layout.component';
import { authGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
  // Rutas de autenticación (login, register)
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  
  // Redirección raíz a página pública principal
  {
    path: '',
    redirectTo: '/public/main',
    pathMatch: 'full',
  },
  // Rutas públicas (visibles sin login)
  {
    path: 'public',
    component: PublicLayoutComponent,
    loadChildren: () => import('./views/public/public.routes'),
  }, 
  // Rutas protegidas (requieren login)
  {
    path: 'app-view',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./views/auth/app-view.routes'),
      },
    ],
  },
  // Redirección en caso de rutas no encontradas
  { path: '**', redirectTo: '/auth/not-found' },
];
