import { Component, inject, OnInit, Input, Output, EventEmitter, 
         OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
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
    this.invoiceForm = this.formBuilder.group({
      fromStreetAddress: ['', Validators.required],
      fromCity: ['', Validators.required],
      fromPostCode: ['', Validators.required],
      fromCountry: ['', Validators.required],
      clientName:['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientStreetAddress: ['', Validators.required],
      clientCity: ['', Validators.required],
      clientPostCode: ['', Validators.required],
      clientCountry: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      paymentTerms: ['Net 1 Day', Validators.required],
      projectDescription: ['', Validators.required],
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
      itemName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [1, [Validators.required, Validators.min(1)]],
      total: [1],
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
        // this.invoiceUpdated.emit({
        //   original: this.invoiceToEditDetail,
        //   updated: this.invoiceForm.getRawValue() as InvoiceInterface
        // })
      }
      else {
        const invoiceData = this.invoiceForm.getRawValue();
        this.newInvoice.emit( invoiceData )
        this.formSubmitType.emit("save")
      }
    } 
    else {
      this.invoiceForm.markAllAsTouched(); 
    }
  }


  submitAsDraft() {
    if( this.invoiceForm.valid ) {
      const invoiceData = this.invoiceForm.getRawValue();
      this.newInvoice.emit( invoiceData )
      this.formSubmitType.emit("draft")
    }
    else {
      this.invoiceForm.markAllAsTouched(); 
    }

  }


  goBackNavigation() {
    this.location.back()
  }




}
