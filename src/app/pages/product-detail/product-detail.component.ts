import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { FooterComponent } from '../../elements/footer/footer.component';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [MatGridListModule,MatButtonModule,MatCardModule, FooterComponent, FormsModule],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  quantity: number = 1;
  cartService: CartService = inject(CartService);

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private _snackBar: MatSnackBar
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
    const cartItem = {
      id: this.product.id,
      product: this.product,
      quantity: this.quantity
    };
    this.cartService.addProduct(cartItem)
      .then(() => {
        this.showSnackBar('Product added to cart successfully');
      })
      .catch(error => {
        this.showSnackBar('Failed to add product to cart');
      });
  }
  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000
    });
  }
}
