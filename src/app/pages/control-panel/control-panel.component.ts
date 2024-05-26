import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../elements/confirm-dialog/confirm-dialog.component';

import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateProductDialogComponent } from '../../elements/create-product-dialog/create-product-dialog.component';


@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {
  productList: Product[] = [];
  productService: ProductService = inject(ProductService);

  dataSource = new MatTableDataSource<Product>(this.productList);
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'image', 'edit', 'delete'];

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) {
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

  openCreateProductDialog(): void{
    const dialogRef = this.dialog.open(CreateProductDialogComponent);
    dialogRef.afterClosed().subscribe(async (result: Product) => {
      if (result) {
        const createdProduct = await this.productService.createProduct(result);
        this.productList.push(createdProduct);
        this.dataSource.data = this.productList;
        this.showSnackBar('Product added successfully');
      }
    });
  }

  async removeProduct(productId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(async result => {
      if (result === true) {
        await this.productService.deleteProduct(productId);
        this.productList = this.productList.filter(product => product.id !== productId);
        this.dataSource.data = this.productList;
        this.showSnackBar('Product deleted successfully');
      }
    });
  }

  showSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Close', {
      duration: 3000
    });
  }


  
}
