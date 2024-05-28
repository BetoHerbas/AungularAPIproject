import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatButtonModule, MatCardModule],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  isSmallScreen: boolean = false;
  allProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private breakpointObserver: BreakpointObserver
  ) {}

  async ngOnInit() {
    this.allProducts = await this.productService.getAllProducts();

    this.route.paramMap.subscribe(async params => {
      const productId = +params.get('id')!;
      this.product = await this.productService.getProductById(productId);
    });

    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  async goToPreviousProduct() {
    const previousProductId = +this.product.id - 1;
    const firstProductId = this.allProducts[0].id;
    const lastProductId = this.allProducts[this.allProducts.length - 1].id;

    try {
      if (previousProductId < firstProductId) {
        this.router.navigate(['/details', lastProductId]);
      } else {
        this.router.navigate(['/details', previousProductId]);
      }
    } catch (error) {
      console.error('Failed to load previous product', error);
    }
  }

  async goToNextProduct() {
    const nextProductId = +this.product.id + 1;
    const firstProductId = this.allProducts[0].id;
    const lastProductId = this.allProducts[this.allProducts.length - 1].id;

    try {
      if (nextProductId > lastProductId) {
        this.router.navigate(['/details', firstProductId]);
      } else {
        this.router.navigate(['/details', nextProductId]);
      }
    } catch (error) {
      console.error('Failed to load next product', error);
    }
  }
}
