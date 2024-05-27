import { Injectable } from '@angular/core';
import { Categories } from '../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = 'http://localhost:3000/categories';
  constructor() { }

  async getAllCategories(): Promise<Categories[]> {
    const data = await fetch(this.apiUrl);
    return (await data.json()) ?? [];
  }

}
