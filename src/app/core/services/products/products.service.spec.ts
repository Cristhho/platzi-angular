import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { environment } from '../../../../environments/environment';
import { createOneProduct, createManyProducts } from '../../models/product.mock';
import { HttpStatusCode } from '@angular/common/http';

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

  describe('when trying to update an existing product', () => {
    it('should update the product with the new given data', (done: DoneFn) => {
      const mockData = createOneProduct();
      const changes = {
        title: 'new title',
        price: 100
      }
      const updated = {
        ...mockData,
        ...changes
      }

      service.updateProduct(mockData.id, changes).subscribe((data) => {
        expect(data).toEqual(updated)
        done();
      });

      const req = httpController.expectOne(`${environment.url_api}/products/${mockData.id}`);
      req.flush(updated);
      expect(req.request.body).toEqual(changes);
      expect(req.request.method).toEqual('PUT');
    })
  })

  describe('when delete a product', () => {
    it('should delete the product and return true', (done: DoneFn) => {
      service.deleteProduct('1').subscribe((data) => {
        expect(data).toBeTruthy()
        done();
      });

      const req = httpController.expectOne(`${environment.url_api}/products/1`);
      req.flush(true);
      expect(req.request.method).toEqual('DELETE');
    });
  })

  describe('when get a single product', () => {
    it('should return the product', (done: DoneFn) => {
      const mockData = createOneProduct();

      service.getProduct('1').subscribe((data) => {
        expect(data).toEqual(mockData);
        done();
      });

      const req = httpController.expectOne(`${environment.url_api}/products/1`);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    });

    it('should return an error if the product doesn\'t exist', (done: DoneFn) => {
      const error = '404'
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: error
      }
      service.getProduct('1').subscribe({
        error: (error) => {
          expect(error).toEqual('El producto no existe');
          done();
        }
      });

      const req = httpController.expectOne(`${environment.url_api}/products/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(error, mockError);
    })

    it('should return an error if the user is not authorized', (done: DoneFn) => {
      const error = '401'
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: error
      }
      service.getProduct('1').subscribe({
        error: (error) => {
          expect(error).toEqual('No estas permitido');
          done();
        }
      });

      const req = httpController.expectOne(`${environment.url_api}/products/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(error, mockError);
    })

    it('should return the default error message', (done: DoneFn) => {
      const error = '500'
      const mockError = {
        status: HttpStatusCode.InternalServerError,
        statusText: error
      }
      service.getProduct('1').subscribe({
        error: (error) => {
          expect(error).toEqual('Ups algo salio mal');
          done();
        }
      });

      const req = httpController.expectOne(`${environment.url_api}/products/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(error, mockError);
    })
  })
});
