import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private limit = 10
  private offset = 0

  products: Product[] = []
  productId: string | null = null

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMore()
    this.route.queryParamMap.subscribe((params) =>
      this.productId = params.get('product')
    )
  }

  loadMore() {
    this.productsService.paginateProducts(this.limit, this.offset)
      .subscribe((res) => {
        this.products.push(...res)
        this.offset += this.limit
      })
  }

}
