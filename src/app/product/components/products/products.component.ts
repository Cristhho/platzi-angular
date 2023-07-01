import { Component, OnInit } from '@angular/core';

import { Product } from './../../../core/models/product.model';
import { ProductsService } from './../../../core/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []
  _limit = 10
  offset = 0
  status: 'loading' | 'success' | 'error' | 'init'= 'init'

  set limit(limit: number) {
    this._limit = limit
  }

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.fetchProducts();
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

  fetchProducts() {
    this.status = 'loading'
    this.productsService.getPaginateProducts(this._limit, this.offset)
    .subscribe({
      next: (products) => {
        this.products.push(...products)
        this.offset += this._limit
        this.status = 'success'
      },
      error: () => {
        setTimeout(() => {
          this.products = []
          this.status = 'error'
        }, 2000)
      }
    });
  }

}
