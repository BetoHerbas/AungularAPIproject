import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { FooterComponent } from '../../elements/footer/footer.component';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [MatGridListModule,MatButtonModule,MatCardModule, FooterComponent],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  quantity: number = 1;

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
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

  addToCart() {

  }

}
