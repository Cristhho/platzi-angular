import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from './../../../core/models/product.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id: string | null = params.get('id');
      if (id) {
        this.fetchProduct(id);
        this.productsService.getProduct(id)
          .subscribe((prod) => this.product = prod)
      } else {
        this.location.back();
      }
    });
  }

  fetchProduct(id: string) {
    this.productsService.getProduct(id)
    .subscribe(product => {
      this.product = product;
    });
  }

  updateProduct() {
    const updateProduct: Partial<Product> = {
      price: 555555,
      description: 'edicion titulo'
    };
    this.productsService.updateProduct('2', updateProduct)
    .subscribe(product => {
      console.log(product);
    });
  }

  deleteProduct() {
    this.productsService.deleteProduct('222')
    .subscribe(rta => {
      console.log(rta);
    });
  }

}
