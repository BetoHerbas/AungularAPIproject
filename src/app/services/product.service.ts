import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  apiUrl = 'http://localhost:3000/products';
  constructor() {}

  async getAllProducts(): Promise<Product[]> {
    const data = await fetch(this.apiUrl);
    return (await data.json()) ?? [];
  }

  async createProduct(product: Product): Promise<Product> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    return response.json();
  }
  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  }
}
