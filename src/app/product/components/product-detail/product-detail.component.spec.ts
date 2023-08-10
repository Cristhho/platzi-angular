import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router'

import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRouteStub } from '../../../../testing';
import { ProductsService } from '../../../core/services/products/products.service';
import { createOneProduct } from '../../../core/models/product.mock';
import { getElementText, mockObservable } from '../../../../testing';
import { Location } from '@angular/common';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent
  let fixture: ComponentFixture<ProductDetailComponent>
  let route: ActivatedRouteStub
  let productService: jasmine.SpyObj<ProductsService>
  let location: jasmine.SpyObj<Location>

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getProduct'])
    const locationSpy = jasmine.createSpyObj('Location', ['back'])
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: Location, useValue: locationSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent)
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>
  });

  it('should create', () => {
    route.setParamMap({id: '1'})
    const productMock = {
      ...createOneProduct(),
      id: '1'
    }
    productService.getProduct.and.returnValue(mockObservable(productMock))

    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should show the product', () => {
    route.setParamMap({id: '1'})
    const productMock = {
      ...createOneProduct(),
      id: '1'
    }
    productService.getProduct.and.returnValue(mockObservable(productMock))

    fixture.detectChanges()
    const title = getElementText(fixture, 'ul li:first-child')
    const price = getElementText(fixture, 'ul li:last-child')
    expect(title).toContain(productMock.title)
    expect(price).toContain(productMock.price)
  })

  it('should go to back if id is null', () => {
    route.setParamMap({})
    location.back.and.callThrough()

    fixture.detectChanges()
    expect(location.back).toHaveBeenCalled()
  })
})
