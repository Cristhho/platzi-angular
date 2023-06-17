import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../../services/products.service'
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  private limit = 10
  private offset = 0

  categoryId: string | null = null
  products: Product[] = []
  productId: string | null = null

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id')
      this.products = []
      this.loadMore()
    })
    this.route.queryParamMap.subscribe((params) =>
      this.productId = params.get('product')
    )
  }

  loadMore() {
    this.productsService.getByCategory(this.categoryId ?? '', this.limit, this.offset)
      .subscribe((data) => {
        this.products.push(...data)
        this.offset += this.limit
      })
  }

}
