import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../../../material/material.module';
import { FooterComponent } from './footer.component';
import { findByQuery } from '../../../../testing';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [FooterComponent]
    }).compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h3> title', () => {
    const h3debug = findByQuery(fixture, 'h3')
    const h3Element: HTMLElement = h3debug.nativeElement
    expect(h3Element).not.toBeUndefined()
    expect(h3Element.textContent).toEqual('Productos')
  })
});
