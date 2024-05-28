import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const productId = +params.get('id')!;
      this.product = await this.productService.getProductById(productId);
    });
  }

  async goToPreviousProduct() {
    const previousProductId = +this.product.id - 1;
    try {
      const previousProduct = await this.productService.getProductById(previousProductId);
      if (previousProduct) {
        this.router.navigate(['/details', previousProductId]);
      }
    } catch (error) {
      console.error('Failed to load previous product', error);
    }
  }

  async goToNextProduct() {
    const nextProductId = +this.product.id + 1;
    try {
      const nextProduct = await this.productService.getProductById(nextProductId);
      if (nextProduct) {
        this.router.navigate(['/details', nextProductId]);
      }
    } catch (error) {
      console.error('Failed to load next product', error);
    }
  }
}
