import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../../elements/product/product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatTableModule, ProductComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {
  productList: Product[] = [];
  productService: ProductService = inject(ProductService);
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'image'];

  ngOnInit():void {
    this.productService.getAllProducts().then((productList: Product[]) => this.productList = productList);
  }
}
