import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsManagerComponent } from './components/products-manager/products-manager.component';
import { ViewProductComponent } from './components/view-product/view-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/products/admin', pathMatch: 'full' },
  { path: 'products/admin', component: ProductsManagerComponent },
  { path: 'products/add', component: AddProductComponent },
  { path: 'products/edit/:productId', component: EditProductComponent },
  { path: 'products/view/:productId', component: ViewProductComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
