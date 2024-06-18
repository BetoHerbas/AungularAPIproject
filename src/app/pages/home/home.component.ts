import { Component, inject } from '@angular/core';
import { ProductComponent } from '../../elements/product/product.component';
import { Product } from '../../interfaces/product';
import { Categories } from '../../interfaces/categories';
import { ProductService } from '../../services/product.service';
import { CategoriesComponent } from '../../elements/categories/categories.component';
import { CategoryService } from '../../services/category.service';
import { FooterComponent } from '../../elements/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ProductComponent, CategoriesComponent, FooterComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  productList: Product[] = [];
  categoriesList: Categories[] = [];
  productService: ProductService = inject(ProductService);
  categoriesService: CategoryService = inject(CategoryService);

  ngOnInit():void {
    this.productService.getAllProducts().then((productList: Product[]) => {
      this.productList = productList.slice(0, 6);
    });

    this.categoriesService.getAllCategories().then((categoriesList: Categories[]) => {
      this.categoriesList = categoriesList;
    });
  }
  redirect() {
    window.location.href = "http://localhost:4200/store";
}
}
