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

  // createProduct(product: Product): Observable<Product> {
  //   return this.http.post<Product>(this.apiUrl, product);
  // }
}
