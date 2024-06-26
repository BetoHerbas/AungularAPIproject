import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { CartComponent } from './pages/cart/cart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BuyCategoryComponent } from './pages/buy-category/buy-category.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'store', component: ShopComponent},
    {path: 'details/:id', component: ProductDetailComponent},
    {path: 'admin', component: ControlPanelComponent},
    {path: 'cart', component: CartComponent},
    {path: 'category/:category', component: BuyCategoryComponent},
    { path: 'signup', component: SignupComponent },
    { path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }