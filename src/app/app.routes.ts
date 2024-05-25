import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'store', component: ShopComponent},
    {path: 'details/:id', component: ProductDetailComponent},
    {path: 'admin', component: ControlPanelComponent},
];