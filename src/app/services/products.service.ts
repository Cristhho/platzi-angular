import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, map, retry, throwError } from 'rxjs';

import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly APIURL = `${environment.API_URL}/api/products`

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.APIURL)
  }

  paginateProducts(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.APIURL}`, {
      params: {limit, offset}
    }).pipe(
      retry(3),
      map((products) => products.map((item) => ({
        ...item,
        taxes: item.price * 0.12
      })))
    )
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.APIURL}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status >= HttpStatusCode.InternalServerError) {
            return throwError(() => new Error('Something is wrong on the server'))
          } else if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => new Error(`Product with the id: ${id} does not exist`))
          }

          return throwError(() => new Error('Ups something went wrong!'))
        })
      )
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
