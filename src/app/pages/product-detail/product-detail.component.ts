import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { switchMap } from 'rxjs';

import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null
  product?: Product

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => {
        this.productId = params.get('id')
        if (this.productId) {
          return this.productsService.getProductById(this.productId)
        }

        return [undefined]
      })
    ).subscribe((data) => this.product = data)
  }

  goToBack() {
    this.location.back()
  }
}
