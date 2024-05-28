import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent{
  editProductForm!: FormGroup;
  originalProductData!: Product;
  productCopy!: Product;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {
    this.editProductForm = this.formBuilder.group({
      id: [data.product.id, Validators.required],
      title: [data.product.title, Validators.required],
      price: [data.product.price, [Validators.required, Validators.min(0)]],
      description: [data.product.description, Validators.required],
      category: [data.product.category, Validators.required],
      image: [data.product.image, Validators.required]
    });
  }

  save(): void {
    if (this.editProductForm.valid) {
      this.dialogRef.close(this.editProductForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
