import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Form, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'reusable-invoice-form',
  imports: [ReactiveFormsModule, CommonModule, Sidebar ],
  templateUrl: './reusable-invoice-form.html',
  styleUrl: './reusable-invoice-form.scss'
})
export class ReusableInvoiceForm implements OnInit {
  formBuilder = inject( FormBuilder )
  invoiceForm!: FormGroup

  ngOnInit(): void {
    this.invoiceForm = this.formBuilder.group({
      streetAddress: [''],
      city: [''],
      postCode: [''],
      country: [''],
      clientName:[''],
      clientEmail: [''],
      clientStreetAddress: [''],
      clientCity: [''],
      clientPostCode: [''],
      clientCountry: [''],
      invoiceDate: [''],
      paymentTerms: [''],
      projectDescription: [''],
      items: this.formBuilder.array([ this.createInvoiceItem() ])  // start with a single invoice item
    })
  }

  // create a single invoice item
  createInvoiceItem(): FormGroup {
    let item = this.formBuilder.group({
      itemName: [''],
      quantity: [1],
      price: [1],
      total: [0],
    })

  this.subscribeToItemChanges(item);
  return item; 
 }


  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push( this.createInvoiceItem() )
  }

  removeItem(index: number): void {
    this.items.removeAt( index )
  }


  calculateItemTotal(item: FormGroup): void {
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const total = quantity * price;
    item.get('total')?.setValue(total, { emitEvent: false });
  }


  subscribeToItemChanges(item: FormGroup): void {
    item.get('quantity')?.valueChanges.subscribe(() => {
      this.calculateItemTotal(item);
    });

    item.get('price')?.valueChanges.subscribe(() => {
      this.calculateItemTotal(item);
    });
  }


  onSubmit(): void {
    if (this.invoiceForm.valid) {
      const invoiceData = this.invoiceForm.getRawValue(); // includes disabled fields like `total`
      console.log('Submitted Invoice Data:', invoiceData);

      // You can now send `invoiceData` to a service or backend
    } else {
      console.log('Form is invalid');
      this.invoiceForm.markAllAsTouched(); // optional: to show validation errors
    }
  }
    



}
