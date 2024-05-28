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
export class EditProductDialogComponent implements OnInit {
  productForm!: FormGroup;
  originalProductData!: Product;
  productCopy!: Product;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

  ngOnInit(): void {
    this.originalProductData = { ...this.data }; // Guardar los datos originales en un objeto diferente
    this.productCopy = { ...this.data }; // Crear una copia para el formulario
    this.productForm = this.formBuilder.group({
      title: [this.productCopy.title || '', Validators.required],
      price: [this.productCopy.price || 0, [Validators.min(0), Validators.required]],
      description: [this.productCopy.description || '', Validators.required],
      category: [this.productCopy.category || '', Validators.required],
      image: [this.productCopy.image || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productCopy);
    }
  }

  onCancel(): void {
    this.productCopy = { ...this.originalProductData }; // Restaurar los datos originales en la copia
    this.dialogRef.close(this.productCopy);
  }
}
