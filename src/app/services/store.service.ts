import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _shoppingCart: Product[] = []
    public get shoppingCart() : Product[] {
      return this._shoppingCart;
    }

  constructor() { }

  addProduct(product: Product) {
    this.shoppingCart.push(product)
  }

  getTotal() {
    return this.shoppingCart.reduce((sum, item) => sum + item.price,0)
  }
}
