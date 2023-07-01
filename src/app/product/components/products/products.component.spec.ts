import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { defer, of } from 'rxjs';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { MaterialModule } from '../../../material/material.module';
import { ProductsService } from '../../../core/services/products/products.service';
import { createManyProducts } from '../../../core/models/product.mock';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent
  let fixture: ComponentFixture<ProductsComponent>
  let productService: jasmine.SpyObj<ProductsService>

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getPaginateProducts'])
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy }
      ],
      declarations: [ ProductsComponent, ProductComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent)
    component = fixture.componentInstance

    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
  })

  it('should create', () => {
    const products = createManyProducts(5)
    component.limit = 5
    productService.getPaginateProducts.and.returnValue(of(products))
    fixture.detectChanges()

    expect(component).toBeTruthy()
    expect(productService.getPaginateProducts).toHaveBeenCalled()
  })

  describe('when call getPaginateProducts', () => {
    it('should return an empty array', () => {
      productService.getPaginateProducts.and.returnValue(of([]))
      fixture.detectChanges()

      expect(Array.isArray(component.products)).toBeTruthy()
      expect(component.products.length).toEqual(0)
    })

    it('should return an array of products', () => {
      const products = createManyProducts(10)
      productService.getPaginateProducts.and.returnValue(of(products))
      fixture.detectChanges()

      const debug = fixture.debugElement.queryAll(By.css('app-product'))
      const firstProductElement: HTMLElement = debug.at(0)!.query(By.css('mat-card-title')).nativeElement

      expect(component.products.length).toEqual(products.length)
      expect(debug.length).toEqual(products.length)
      expect(firstProductElement.textContent).toEqual(products.at(0)!.title.toUpperCase())
    })

    it('should change status from loading to success', fakeAsync(() => {
      const products = createManyProducts(5)
      productService.getPaginateProducts.and.returnValue(defer(() => Promise.resolve(products)))
      const prevLength = component.products.length


      fixture.detectChanges()
      expect(component.status).toEqual('loading')
      tick()
      fixture.detectChanges()

      expect(component.products.length).toEqual(prevLength + products.length)
      expect(component.status).toEqual('success')
    }))

    it('should change status from loading to error', fakeAsync(() => {
      productService.getPaginateProducts.and.returnValue(defer(() => Promise.reject('error')))

      fixture.detectChanges()
      expect(component.status).toEqual('loading')
      tick(2500)
      fixture.detectChanges()

      expect(component.status).toEqual('error')
    }))
  })
})
