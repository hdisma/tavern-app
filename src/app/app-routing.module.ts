import { SignoutCallbackRedirectComponent } from './shared/components/signout-callback-redirect/signout-callback-redirect.component';
import { SigninCallbackRedirectComponent } from './shared/components/signin-callback-redirect/signin-callback-redirect.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'category',
    loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
  },
  { path: 'signin-callback', component: SigninCallbackRedirectComponent },
  { path: 'signout-callback', component: SignoutCallbackRedirectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
