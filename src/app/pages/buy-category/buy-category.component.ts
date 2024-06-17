import { Component, inject } from '@angular/core';
import { ProductComponent } from '../../elements/product/product.component';
import { FooterComponent } from '../../elements/footer/footer.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy-category',
  standalone: true,
  imports: [ ProductComponent, FooterComponent],
  templateUrl: './buy-category.component.html',
  styleUrls: ['./buy-category.component.scss']
})
export class BuyCategoryComponent {
  productList: Product[] = [];
  productService: ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);
  category: string | null= '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      this.category = category;
      if (category) {
        this.productService.getAllProducts().then((productList: Product[]) => {
          this.productList = productList.filter(product => product.category.toLowerCase() === category.toLowerCase());
        });
      }
    });
  }
  
  
}
