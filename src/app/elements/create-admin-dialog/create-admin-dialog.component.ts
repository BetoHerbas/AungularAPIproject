import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-admin-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './create-admin-dialog.component.html',
  styleUrl: './create-admin-dialog.component.scss'
})
export class CreateAdminDialogComponent {
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateAdminDialogComponent>
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: [0],
      title: ['', Validators.required],
      price: [0, [Validators.min(0), Validators.required]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
   
  onCancel(): void {
    this.dialogRef.close();
  }
}
