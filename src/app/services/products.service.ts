import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly APIURL = 'https://young-sands-07814.herokuapp.com/api/products'

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.APIURL)
  }

  paginateProducts(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.APIURL}`, {
      params: {limit, offset}
    })
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.APIURL}/${id}`)
  }

  create(newProduct: CreateProductDTO) {
    return this.http.post<Product>(`${this.APIURL}`, newProduct)
  }

  update(id: number, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.APIURL}/${id}`, dto)
  }

  delete(id: number) {
    return this.http.delete<boolean>(`${this.APIURL}/${id}`)
  }
}
