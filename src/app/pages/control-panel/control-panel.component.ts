import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../../elements/product/product.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, ProductComponent, ReactiveFormsModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {
  productList: Product[] = [];
  dataSource = new MatTableDataSource<Product>(this.productList);
  productService: ProductService = inject(ProductService);
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'image', 'edit', 'delete'];

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.min(0)],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productService.getAllProducts().then((productList: Product[]) => {
      this.productList = productList
      this.dataSource.data = productList
    });

  }

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  async addProduct() {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      const createdProduct = await this.productService.createProduct(newProduct);
      this.productList.push(createdProduct);
      this.dataSource.data = this.productList;
      this.productForm.reset();
    }
    else {
      alert('Please fill out all fields');
    }
  }
  async removeProduct(productId: number) {
    await this.productService.deleteProduct(productId);
    this.productList = this.productList.filter(product => product.id !== productId);
    this.dataSource.data = this.productList;
  }
}
