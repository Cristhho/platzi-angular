import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { MaterialModule } from '../../../material/material.module';
import { ProductComponent } from './product.component';
import { createOneProduct } from '../../../core/models/product.mock';
import { Product } from '../../../core/models/product.model';

fdescribe('ProductComponent', () => {
  let component: ProductComponent
  let fixture: ComponentFixture<ProductComponent>
  let product: Product

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule
      ],
      declarations: [ProductComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    product = createOneProduct()
    component.product = product
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show the product title', () => {
    const debug = fixture.debugElement.query(By.css('mat-card-title'))
    const element: HTMLElement = debug.nativeElement
    expect(element).not.toBeUndefined()
    expect(element.textContent).toEqual(product.title.toUpperCase())
  })

  it('should call add to cart method', () => {
    const spy = spyOn(fixture.componentInstance, 'addCart');
    const debug = fixture.debugElement.query(By.css('button'))
    debug.triggerEventHandler('click', null)
    expect(spy).toHaveBeenCalled()
  })
})
