import { Component, inject } from '@angular/core';
import { Cart } from '../../interfaces/cart';
import { CartService } from '../../services/cart.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  productsCartList: Cart[] = [];
  cartService: CartService = inject(CartService);

  dataSource = new MatTableDataSource<Cart>(this.productsCartList);
  displayedColumns: string[] = ['delete', 'image', 'title', 'price', 'quantity', 'subtotal'];
  total = 0;
  totalDataSource = new MatTableDataSource<any>;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartService.getAllProducts().then((productsCartList: Cart[]) => {
      this.productsCartList = productsCartList;
      this.dataSource.data = productsCartList;
      this.calculateTotal();
    });

  }

  getTotal(): number {
    let total = 0;
    this.productsCartList.forEach((cartItem: Cart) => {
      total += cartItem.subtotal;
    });
    return total;
  }
  calculateTotal() {
    this.total = this.getTotal();
    this.totalDataSource = new MatTableDataSource([{ total: this.total }]);
  }

  async removeFromCart(productId: number) {
    const result = await this.cartService.deleteFromCart(productId);
      this.productsCartList = this.productsCartList.filter(product => product.id !== productId);
      this.dataSource.data = this.productsCartList;
      this.calculateTotal();
      this.showSnackBar('Removed from cart successfully');
  }
  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000
    });
  }
}