import { RouterModule, Routes } from '@angular/router'; 
import { MainComponent } from './template/main/main.component';
import { ProductComponent } from './template/product/product.component';
import { ContactComponent } from './template/contact/contact.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'main', component: MainComponent },
    { path: 'product', component: ProductComponent },
    { path: 'contact', component: ContactComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export default class PublicRoutesModule {}