import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup } from '@angular/forms';


@Component({
  selector: 'reusable-invoice-form',
  imports: [ReactiveFormsModule, Sidebar],
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
      aliases: this.formBuilder.array([ this.createItem() ])  // start with a single invoice item

    })
  }

  // create a single invoice item
  createItem() {
    
  }

  
}
