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

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call once', (done: DoneFn) => {

    service.getAllProducts().subscribe({
      next: () => {done()}
    })

    const req = httpController.expectOne(`${environment.url_api}/products`)
    req.flush([])
  });

  describe('when call getAllProducts', () => {
    it('should return an empty array', (done: DoneFn) => {
      service.getAllProducts().subscribe((data) => {
        expect(data.length).toEqual(0);
        done();
      });

      const req = httpController.expectOne(`${environment.url_api}/products`);
      req.flush([]);
    });

    it('should return an array with 1 product', (done: DoneFn) => {
      const mockData = [createOneProduct()];
      service.getAllProducts().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        done();
      });

      const req = httpController.expectOne(`${environment.url_api}/products`);
      req.flush(mockData);
    });

    it('should return an array with many products', (done: DoneFn) => {
      const mockData = createManyProducts(3);
      service.getAllProducts().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        done();
      });

      const req = httpController.expectOne(`${environment.url_api}/products`);
      req.flush(mockData);
    });
  });

  describe('when call getPaginateProducts', () => {
    it('should send query params with limit 10 and offset 0 and return 10 products', (done: DoneFn) => {
      const mockData = createManyProducts(3);
      const limit = 10;
      const offset = 0;
      service.getPaginateProducts(limit, offset).subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        done();
      });

      const req = httpController.expectOne(`${environment.url_api}/products?limit=${limit}&offset=${offset}`);
      req.flush(mockData);
      const params = req.request.params
      expect(params.get('limit')).toEqual(`${limit}`)
      expect(params.get('offset')).toEqual(`${offset}`)
    })
  })

  describe('when trying to create a new product', () => {
    it('should create and return the created product', (done: DoneFn) => {
      const mockData = createOneProduct();

      service.createProduct({...mockData}).subscribe((data) => {
        expect(data).toEqual(mockData)
        done();
      });

      const req = httpController.expectOne(`${environment.url_api}/products`);
      req.flush(mockData);
      expect(req.request.body).toEqual(mockData);
      expect(req.request.method).toEqual('POST');
    })
  })
});
