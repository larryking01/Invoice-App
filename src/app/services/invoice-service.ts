import { Injectable, inject } from '@angular/core';
import { InvoiceInterface } from '../shared/invoiceInterface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  allInvoicesArray = new BehaviorSubject<InvoiceInterface[]>([])
  allInvoicesArray$ = this.allInvoicesArray.asObservable()
  
  httpClient = inject( HttpClient )

  constructor() { }

  createInvoice(newInvoice: InvoiceInterface) {
    const currentInvoices = this.allInvoicesArray.getValue();   // get current array value
    const updatedInvoices = [ ...currentInvoices, newInvoice ];   // append 
    this.allInvoicesArray.next( updatedInvoices );  // emit the updated array.

  }

  
  updateInvoice(currentInvoice: InvoiceInterface, updatedInvoice: InvoiceInterface) {
    console.log("current invoice = ", currentInvoice );
    console.log("updated invoice = ", updatedInvoice );
    let currentInvoices = this.allInvoicesArray.getValue()
    let invoiceToUpdateIndex = currentInvoices.findIndex( invItem => invItem.id === currentInvoice.id );
    console.log("id of invoice to update = ", invoiceToUpdateIndex )
    let updatedInvoices = [...currentInvoices];
    updatedInvoices[invoiceToUpdateIndex] = updatedInvoice;
    this.allInvoicesArray.next( updatedInvoices )
  }



  fetchInvoices(){
    let storedInvoices = this.httpClient.get<InvoiceInterface[]>('../../assets/data/invoiceData.json');
    storedInvoices.subscribe({
      next: ( data ) => {
        this.allInvoicesArray.next( data );
        // console.log("all invoices array = ", this.allInvoicesArray)
      },
      error: ( err ) => {
        console.error('failed to fetch invoice data: ', err)
      }
    })
  }


  fetchTargetInvoice(invoiceID: string): InvoiceInterface | undefined {
    let currentInvoices = this.allInvoicesArray.getValue();
    let targetInvoice = currentInvoices.find( invoice => invoice.id === invoiceID )
    return targetInvoice;
    
  }



  deleteInvoice(invoice: InvoiceInterface) {

  }



}
