import { Component, inject } from '@angular/core';
import { ProductComponent } from '../../elements/product/product.component';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ProductComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  productList: Product[] = [];
  productService: ProductService = inject(ProductService);
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'image'];

  ngOnInit():void {
    this.productService.getAllProducts().then((productList: Product[]) => {
      this.productList = productList.slice(0, 5);
    });
  }
}
