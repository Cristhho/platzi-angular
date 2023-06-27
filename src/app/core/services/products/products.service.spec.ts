import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { environment } from '../../../../environments/environment';
import { createOneProduct, createManyProducts } from '../../models/product.mock';

fdescribe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        ProductsService
      ]
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call once', (done: DoneFn) => {

    service.getAllProducts().subscribe({
      next: () => {done()}
    })

    const req = httpController.expectOne(`${environment.url_api}/products`)
    req.flush([])
    httpController.verify()
  });

  describe('when call getAllProducts', () => {
    it('should return an empty array', (done: DoneFn) => {
      service.getAllProducts().subscribe((data) => {
        expect(data.length).toEqual(0);
        done();
      });

      const req = httpController.expectOne(`${environment.url_api}/products`);
      req.flush([]);
      httpController.verify();
    });

    it('should return an array with 1 product', (done: DoneFn) => {
      const mockData = [createOneProduct()];
      service.getAllProducts().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        done();
      });

      const req = httpController.expectOne(`${environment.url_api}/products`);
      req.flush(mockData);
      httpController.verify();
    });

    it('should return an array with many products', (done: DoneFn) => {
      const mockData = createManyProducts(3);
      service.getAllProducts().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        done();
      });

      const req = httpController.expectOne(`${environment.url_api}/products`);
      req.flush(mockData);
      httpController.verify();
    });
  })
});
