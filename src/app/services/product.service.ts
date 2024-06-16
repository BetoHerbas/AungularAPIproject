import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products';

  constructor() {}

  async getAllProducts(): Promise<Product[]> {
    const data = await fetch(this.apiUrl);
    console.log(data);
    return (await data.json()) ?? [];
  }
  // getAllProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.apiUrl);
  // }

  // async getAllProducts(): Promise<Product[]> {
  //   const response = await fetch(this.apiUrl);
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch products');
  //   }
  //   return response.json();
  // }

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

  async updateProduct(product: Product): Promise<Product> {
    const response = await fetch(`${this.apiUrl}/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  }

  async getProductById(productId: number): Promise<Product> {
    const response = await fetch(`${this.apiUrl}/${productId}`);
    return response.json();
  }
}
