import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
// import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice-service';
import { InvoiceInterface } from '../../shared/invoiceInterface';
import { InvoiceStatus } from '../../shared/invoiceInterface';
import { PrependDotPipe } from '../../pipes/prepend-dot-pipe';

@Component({
  selector: 'invoice-list-component',
  imports: [ CommonModule, Sidebar,PrependDotPipe ],
  templateUrl: './invoice-list-component.html',
  styleUrl: './invoice-list-component.scss'
})
export class InvoiceListComponent implements OnInit {
  router = inject( Router );
  invoiceService = inject( InvoiceService );
  // showInvoices: boolean = true;
  invoicesArray: InvoiceInterface[] = [];
  // numberOfInvoices: number = 0;


  ngOnInit(): void {
    this.invoiceService.fetchInvoices();
    this.invoiceService.allInvoicesArray$.subscribe( data => {
      this.invoicesArray = data;
      console.log('invoices array = ', this.invoicesArray);
    })
  }

  navigateToInvoiceDetails(invoiceID: string) {
    this.router.navigate(['invoices', invoiceID])
  }

  navigateToNewInvoice() {
    this.router.navigate([
      {
        outlets:{
          modal: ['invoices', 'new']
        }
      }
    ])
  }


  new_invoice: InvoiceInterface = {
    id: "VFG534",
    invoiceName: "Website Design",
    invoiceDate: "2025-06-01",
    paymentDate: "2025-06-10",
    clientName: "Acme Corp",
    clientEmail: "client@acme.com",
    clientCompany: "Nestle",
    invoicePurpose: 'Marketing',
    status: InvoiceStatus.draft,
    items: [
      {
        itemName: "Landing Page Design",
        quantity: 4,
        price: 500,
        itemTotal: 345
      },
      {
        itemName: "Logo Design",
        quantity: 3,
        price: 200,
        itemTotal: 123
      }
    ],
    clientCountry: "USA",
    clientCity: "New York",
    clientStreetName: "Broadway",
    clientStreetNumber: "123",
    totalPrice: 3543.96
};



}
