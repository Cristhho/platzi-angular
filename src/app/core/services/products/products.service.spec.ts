import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { ProductsService } from './products.service';

fdescribe('ProductsService', () => {
  let service: ProductsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        {
          provide: HttpClient, useValue: httpClientSpy
        }
      ]
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
