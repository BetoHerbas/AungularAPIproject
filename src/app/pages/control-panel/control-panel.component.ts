import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../../elements/confirm-dialog/confirm-dialog.component';
import { CreateProductDialogComponent } from '../../elements/create-product-dialog/create-product-dialog.component';
import { EditProductDialogComponent } from '../../elements/edit-product-dialog/edit-product-dialog.component'; // Importa el componente de edición

import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FooterComponent } from '../../elements/footer/footer.component';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule, FooterComponent],
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  productList: Product[] = [];
  productService: ProductService = inject(ProductService);

  dataSource = new MatTableDataSource<Product>(this.productList);
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'category', 'image', 'edit', 'delete'];

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.productService.getAllProducts().then((productList: Product[]) => {
      this.productList = productList;
      this.dataSource.data = productList;
    });
  }

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(CreateProductDialogComponent);
    dialogRef.afterClosed().subscribe(async (result: Product) => {
      if (result) {
        const newProduct = await this.productService.createProduct(result);
        this.productList.push(newProduct);
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

  async editProduct(productId: number) {
    const productToEdit = this.productList.find(product => product.id === productId);
    if (productToEdit) {
      const dialogRef = this.dialog.open(EditProductDialogComponent, {
        data: productToEdit // Pasamos los datos del producto a editar al diálogo de edición
      });

      dialogRef.afterClosed().subscribe(async (result: Product) => {
        if (result) {
          const updatedProduct = await this.productService.updateProduct(productId, result);
          const index = this.productList.findIndex(product => product.id === productId);
          if (index !== -1) {
            this.productList[index] = updatedProduct;
            this.dataSource.data = this.productList;
            this.showSnackBar('Product updated successfully');
          }
        }
      });
    }
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000
    });
  }
}
