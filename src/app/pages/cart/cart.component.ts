import { Component, inject } from '@angular/core';
import { Cart } from '../../interfaces/cart';
import { CartService } from '../../services/cart.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  productsCartList: Cart[] = [];
  cartService: CartService = inject(CartService);

  dataSource = new MatTableDataSource<Cart>(this.productsCartList);
  displayedColumns: string[] = ['delete','image','title', 'price', 'quantity', 'subtotal'];

  ngOnInit(): void {
    this.cartService.getAllProducts().then((productsCartList: Cart[]) => {
      this.productsCartList = productsCartList;
      this.dataSource.data = productsCartList;
    });
  }
}
