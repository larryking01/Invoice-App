import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableInvoiceForm } from './reusable-invoice-form';

describe('ReusableInvoiceForm', () => {
  let component: ReusableInvoiceForm;
  let fixture: ComponentFixture<ReusableInvoiceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableInvoiceForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableInvoiceForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
