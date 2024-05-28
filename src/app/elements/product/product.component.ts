import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  constructor(private router: Router) {}
  deleteProduct() {
    this.delete.emit(this.product.id);
  }

  editProduct() {
    this.edit.emit(this.product.id);
  }

  seeDetails(productId:number){
    this.router.navigate(['/details', productId]);
  }
}
