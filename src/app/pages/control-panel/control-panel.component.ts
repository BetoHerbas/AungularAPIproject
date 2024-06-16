import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmDialogComponent } from '../../elements/confirm-dialog/confirm-dialog.component';
import { CreateProductDialogComponent } from '../../elements/create-product-dialog/create-product-dialog.component';
import { EditProductDialogComponent } from '../../elements/edit-product-dialog/edit-product-dialog.component';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { FooterComponent } from '../../elements/footer/footer.component';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FooterComponent,
  ],
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit, AfterViewInit {
  productList: Product[] = [];
  productService: ProductService = inject(ProductService);

  dataSource = new MatTableDataSource<Product>(this.productList);
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'image', 'edit', 'delete'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async loadProducts() {
    try {
      const products = await this.productService.getAllProducts();
      this.productList = products;
      this.dataSource.data = products;
    } catch (error) {
      console.error('Failed to load products', error);
      this.showSnackBar('Failed to load products');
    }
  }

  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(CreateProductDialogComponent);
    dialogRef.afterClosed().subscribe(async (result: Product) => {
      if (result) {
        try {
          const newProduct = await this.productService.createProduct(result);
          this.productList.push(newProduct);
          this.dataSource.data = this.productList;
          this.showSnackBar('Product added successfully');
        } catch (error) {
          console.error('Failed to add product', error);
          this.showSnackBar('Failed to add product');
        }
      }
    });
  }

  async removeProduct(productId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result === true) {
        try {
          await this.productService.deleteProduct(productId);
          this.productList = this.productList.filter((product) => product.id !== productId);
          this.dataSource.data = this.productList;
          this.showSnackBar('Product deleted successfully');
        } catch (error) {
          console.error('Failed to delete product', error);
          this.showSnackBar('Failed to delete product');
        }
      }
    });
  }

  openEditProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: { product },
    });

    dialogRef.afterClosed().subscribe(async (result: Product) => {
      if (result) {
        try {
          const updatedProduct = await this.productService.updateProduct(result);
          const index = this.productList.findIndex((p) => p.id === updatedProduct.id);
          if (index !== -1) {
            this.productList[index] = updatedProduct;
            this.dataSource.data = this.productList;
            this.showSnackBar('Product updated successfully');
          }
        } catch (error) {
          console.error('Failed to update product', error);
          this.showSnackBar('Failed to update product');
        }
      }
    });
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
