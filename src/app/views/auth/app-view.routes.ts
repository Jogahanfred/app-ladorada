import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './template/dashboard/dashboard.component';
import { CatalogComponent } from './template/catalog/catalog.component';
import { HistoryComponent } from './template/history/history.component';
import { ShoppingCartComponent } from './template/shopping-cart/shopping-cart.component';
import { ProfileComponent } from './template/profile/profile.component';
import { authGuard } from '../../shared/guard/auth.guard';

const routes: Routes = [ 
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]  },
    { path: 'catalog', component: CatalogComponent, canActivate: [authGuard]   },
    { path: 'history', component: HistoryComponent, canActivate: [authGuard]   },
    { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [authGuard]   },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard]   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class PublicRoutesModule {}
