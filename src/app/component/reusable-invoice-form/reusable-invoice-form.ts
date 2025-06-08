import { Component, inject, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { InvoiceInterface } from '../../shared/invoiceInterface';


@Component({
  selector: 'reusable-invoice-form',
  imports: [ReactiveFormsModule, CommonModule, Sidebar ],
  templateUrl: './reusable-invoice-form.html',
  styleUrl: './reusable-invoice-form.scss'
})
export class ReusableInvoiceForm implements OnInit, OnChanges {
  @Input() invoiceToEditDetail: InvoiceInterface | undefined = undefined;
  @Output() newInvoice = new EventEmitter<any>();
  @Output() invoiceUpdated = new EventEmitter<{original: InvoiceInterface, updated: InvoiceInterface}>();
  @Output() formSubmitType = new EventEmitter<string>()

  formBuilder = inject( FormBuilder )
  invoiceForm!: FormGroup
  location = inject( Location )

  ngOnInit(): void {
    console.log("invoice to edit = ", this.invoiceToEditDetail )
    this.invoiceForm = this.formBuilder.group({
      fromStreetAddress: [''],
      fromCity: [''],
      fromPostCode: [''],
      fromCountry: [''],
      clientName:[''],
      clientEmail: [''],
      clientStreetAddress: [''],
      clientCity: [''],
      clientPostCode: [''],
      clientCountry: [''],
      invoiceDate: [''],
      paymentTerms: ['0'],
      projectDescription: [''],
      items: this.formBuilder.array([ this.createInvoiceItem() ])  // start with a single invoice item
    })


    if (this.invoiceToEditDetail) {
      this.populateFormWithInvoice(this.invoiceToEditDetail);
    }
  }


  populateFormWithInvoice(invoice: InvoiceInterface): void {
    this.invoiceForm.patchValue({
      fromStreetAddress: invoice.fromStreetAddress,
      fromCity: invoice.fromCity,
      fromPostCode: invoice.fromPostCode,
      fromCountry: invoice.fromCountry,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      clientStreetAddress: invoice.clientStreetAddress,
      clientCity: invoice.clientCity,
      clientPostCode: invoice.clientPostCode,
      clientCountry: invoice.clientCountry,
      invoiceDate: invoice.invoiceDate,
      paymentTerms: invoice.paymentTerms,
      projectDescription: invoice.projectDescription
    });

    const itemsArray = this.invoiceForm.get('items') as FormArray;
    itemsArray.clear();

    invoice.items.forEach(item => {
      const itemGroup = this.formBuilder.group({
        itemName: [item.itemName],
        quantity: [item.quantity],
        price: [item.price],
        total: [item.itemTotal]
      });

      this.subscribeToItemChanges(itemGroup);
      this.calculateItemTotal(itemGroup);      
      itemsArray.push(itemGroup);
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['invoiceToEditDetail'] && this.invoiceToEditDetail && this.invoiceForm) {
      this.populateFormWithInvoice(this.invoiceToEditDetail);
    }
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
      if( this.invoiceToEditDetail ) {
        console.log('edit')
        console.log("edit: new invoice = ", this.invoiceToEditDetail)
        console.log("edit: updated invoice = ", this.invoiceForm.value)
        this.invoiceUpdated.emit({
          original: this.invoiceToEditDetail,
          updated: this.invoiceForm.getRawValue() as InvoiceInterface
        })
      }
      else {
        const invoiceData = this.invoiceForm.getRawValue();
        console.log('Submitted Invoice Data:', invoiceData);
        this.newInvoice.emit( invoiceData )
        this.formSubmitType.emit("save")
      }
    } 
    else {
      console.log('Form is invalid');
      this.invoiceForm.markAllAsTouched(); 
    }
  }


  submitAsDraft() {
    if( this.invoiceForm.valid ) {
      const invoiceData = this.invoiceForm.getRawValue();
      console.log('Submitted Invoice Data:', invoiceData);
      this.newInvoice.emit( invoiceData )
      this.formSubmitType.emit("draft")
      console.log("invoice saved as draft")
    }
    else {
      console.log('Form is invalid');
      this.invoiceForm.markAllAsTouched(); 
    }

  }


  goBackNavigation() {
    this.location.back()
  }




}
