import { Injectable } from '@angular/core';
import { BuyCartItem } from '../interfaces/buyCartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = 'http://localhost:3000/buycart';

  constructor() { }
  async getBuyCartByUserId(userId: number): Promise<BuyCartItem[]> {
    const data = await fetch(`${this.apiUrl}/${userId}`);
    return (await data.json()) ?? [];
  }

  async addProductToCart(cartItem: BuyCartItem): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItem)
    });

    if (!response.ok) {
      throw new Error('Failed to add product to cart');
    }
  }

  async deleteFromCart(cartId: number): Promise<void> {
    const url = `${this.apiUrl}/${cartId}`;
    await fetch(url, { method: 'DELETE' });
  }
}
