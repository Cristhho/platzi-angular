import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { environment } from '../../../../environments/environment';

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
});
