import { Component, inject } from '@angular/core';
import { ProductComponent } from '../../elements/product/product.component';
import { FooterComponent } from '../../elements/footer/footer.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ ProductComponent, FooterComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  productList: Product[] = [];
  productService: ProductService = inject(ProductService);

  ngOnInit():void {
    this.productService.getAllProducts().then((productList: Product[]) => {
      this.productList = productList;
    });
  }
}
