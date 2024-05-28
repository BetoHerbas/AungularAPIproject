import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product!: Product;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.productId = +id;
      this.loadProduct(this.productId);
    } else {
      console.error('ID del producto no encontrado');
    }
  }

  loadProduct(id: number) {
    this.http.get<{ products: Product[] }>('assets/db.json').subscribe(data => {
      const product = data.products.find(p => p.id === id);
      if (product) {
        this.product = product;
      } else {
        console.error('Producto no encontrado');
      }
    }, error => {
      console.error('Error cargando el archivo JSON:', error);
    });
  }

  goToNextProduct() {
    const nextProductId = this.productId + 1;
    this.router.navigate(['/details', nextProductId]);
  }

  goToPreviousProduct() {
    const previousProductId = this.productId - 1;
    this.router.navigate(['/details', previousProductId]);
  }
}
