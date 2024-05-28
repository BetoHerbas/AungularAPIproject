import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = 'http://localhost:3000/cart';

  constructor() { }
  async getAllProducts(): Promise<Cart[]> {
    const data = await fetch(this.apiUrl);
    return (await data.json()) ?? [];
  }
  async addProduct(product: Cart): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (!response.ok) {
      throw new Error('Failed to add product to cart');
    }
  }
  async deleteFromCart(productId: number): Promise<void> {
    const url = `${this.apiUrl}/${productId}`;
    await fetch(url, { method: 'DELETE' });
  }
}
