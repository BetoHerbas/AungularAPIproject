import { Component, inject } from '@angular/core';
import { BuyCartItem } from '../../interfaces/buyCartItem';
import { CartService } from '../../services/cart.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  productsCartList: BuyCartItem[] = [];
  cartService: CartService = inject(CartService);

  userId: number = Number(localStorage.getItem('userId'));

  dataSource = new MatTableDataSource<BuyCartItem>(this.productsCartList);
  displayedColumns: string[] = ['delete', 'image', 'title', 'price', 'quantity', 'subtotal'];
  total = 0;
  totalDataSource = new MatTableDataSource<any>;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartService.getBuyCartByUserId(this.userId).then((productsCartList: any[]) => {
      this.productsCartList = productsCartList;
      this.dataSource.data = productsCartList;
      this.calculateTotal();
    });
  }

  getTotal(): number {
    let total = 0;
    this.productsCartList.forEach((cartItem: any) => {
      const productPrice = cartItem.product.price;
      total += cartItem.quantity * productPrice;
    });
    return total;
  }
  
  calculateTotal() {
    this.total = this.getTotal();
    this.totalDataSource = new MatTableDataSource([{ total: this.total }]);
  }

  async removeFromCart(cartItem: BuyCartItem) {
    try {
      await this.cartService.deleteFromCart(cartItem.id);
      this.productsCartList = this.productsCartList.filter(item => item.id !== cartItem.id);
      this.dataSource.data = this.productsCartList;
      this.calculateTotal();
      this.showSnackBar('Removed from cart successfully');
    } catch (error) {
      console.error('Failed to remove product from cart', error);
      this.showSnackBar('Failed to remove product from cart');
    }
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000
    });
  }
}