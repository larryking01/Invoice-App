import { Injectable, inject } from '@angular/core';
import { InvoiceInterface } from '../shared/invoiceInterface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private STORAGE_KEY = 'invoices';
  private allInvoicesArray = new BehaviorSubject<InvoiceInterface[]>([]);
  allInvoicesArray$ = this.allInvoicesArray.asObservable();

  private httpClient = inject(HttpClient);

  constructor() {
    this.initializeInvoices();
  }

  private initializeInvoices() {
    // localStorage.clear()
    const storedInvoices = localStorage.getItem(this.STORAGE_KEY);
    if (storedInvoices) {
      const parsed = JSON.parse(storedInvoices);
      this.allInvoicesArray.next(parsed);
    } else {
      this.httpClient.get<InvoiceInterface[]>('assets/data/invoiceData.json').subscribe({
        next: (data) => {
          this.allInvoicesArray.next(data);
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        },
        error: (err) => {
          console.error('Failed to fetch invoice data: ', err);
        }
      });
    }
  }


  private updateLocalStorage(data: InvoiceInterface[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }


  createInvoice(newInvoice: InvoiceInterface) {
    const currentInvoices = this.allInvoicesArray.getValue();
    const updatedInvoices = [...currentInvoices, newInvoice];
    this.allInvoicesArray.next(updatedInvoices);
    this.updateLocalStorage(updatedInvoices);
  }


  updateInvoice(currentInvoice: InvoiceInterface, updatedInvoice: InvoiceInterface) {
    const currentInvoices = this.allInvoicesArray.getValue();
    const index = currentInvoices.findIndex(inv => inv.id === currentInvoice.id);
    if (index !== -1) {
      const updatedInvoices = [...currentInvoices];
      updatedInvoices[index] = updatedInvoice;
      this.allInvoicesArray.next(updatedInvoices);
      this.updateLocalStorage(updatedInvoices);
    }
    console.log("update service, current invoice = ", currentInvoice)
    console.log("update service, updated invoice = ", updatedInvoice)
    console.log("updated invoices array = ", this.allInvoicesArray.getValue())
  }


  deleteInvoice(invoice: InvoiceInterface) {
    const currentInvoices = this.allInvoicesArray.getValue();
    const updatedInvoices = currentInvoices.filter(inv => inv.id !== invoice.id);
    this.allInvoicesArray.next(updatedInvoices);
    this.updateLocalStorage(updatedInvoices);
    console.log("invoice service delete = ", currentInvoices )
    console.log("after delete = ", updatedInvoices )
  }


  fetchTargetInvoice(invoiceID: string): InvoiceInterface | undefined {
    const currentInvoices = this.allInvoicesArray.getValue();
    return currentInvoices.find(invoice => invoice.id === invoiceID);
  }


  getInvoiceById$(id: string) {
    return this.allInvoicesArray$.pipe(map(invoices => invoices.find(invoice => invoice.id === id)));
  }



  generateInvoiceId(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomPrefix =
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)];
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `${randomPrefix}${randomDigits}`;
  }
}
