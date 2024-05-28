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
}
