import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = []

  shoppingCart: Product[] = []
  total = 0

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
  ){
    this.shoppingCart = storeService.shoppingCart
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe((res) => this.products = res)
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()
  }

  onShowProductDetail(id: number) {
    this.productsService.getProductById(id)
      .subscribe((res) => console.log(res))
  }
}
