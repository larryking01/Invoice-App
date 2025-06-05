import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { InvoiceService } from '../../services/invoice-service';
import { InvoiceInterface } from '../../shared/invoiceInterface';
import { InvoiceStatus } from '../../shared/invoiceInterface';


@Component({
  selector: 'invoice-details-component',
  imports: [ CommonModule, Sidebar ],
  templateUrl: './invoice-details-component.html',
  styleUrl: './invoice-details-component.scss'
})
export class InvoiceDetailsComponent implements OnInit {
  router = inject( Router )
  location = inject( Location )
  activeRoute = inject( ActivatedRoute )
  invoiceService = inject( InvoiceService )
  selectedInvoiceID: string = '';
  selectedInvoice: InvoiceInterface | undefined = undefined;
  // invoiceItemTotalPrice: number = 0;
  invoicesGrandTotal: number = 0;


  current_invoice: InvoiceInterface = {
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

  updated_invoice: InvoiceInterface = {
      id: "VFG534",
      invoiceName: "Website Design",
      invoiceDate: "2025-06-01",
      paymentDate: "2025-06-10",
      clientName: "Acme Corp",
      clientEmail: "client@acme.com",
      clientCompany: "Nestle",
      invoicePurpose: 'Sales',
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
  

  ngOnInit(): void {
    this.selectedInvoiceID = this.activeRoute.snapshot.paramMap.get('id')!
    // console.log(`selected route id = ${ this.selectedInvoiceID }`)

    this.selectedInvoice = this.invoiceService.fetchTargetInvoice( this.selectedInvoiceID as string );
    // console.log('selected invoice = ', this.selectedInvoice )
    // console.log('selected invoice id = ', this.selectedInvoice?.id )

    // this.calculateTotalInvoicePrice( this.selectedInvoice );
    this.invoicesGrandTotal = this.calculateGrandInvoiceTotal( this.selectedInvoice )

  }


  updateSelectedInvoice(currentInvoice: InvoiceInterface, updatedInvoice: InvoiceInterface) {
    this.invoiceService.updateInvoice( currentInvoice, updatedInvoice )
    this.selectedInvoiceID = this.activeRoute.snapshot.paramMap.get('id')!
    this.selectedInvoice = this.invoiceService.fetchTargetInvoice( this.selectedInvoiceID as string );

  }

  calculateGrandInvoiceTotal(invoice: InvoiceInterface | undefined ) {
    if( !invoice || !invoice.items ) {
      return 0
    }
    else {
      return invoice.items.reduce(( sum, item ) => {
        return sum + ( item.price * item.quantity )
      }, 0)
    }

  }


  goBackNavigation() {
    this.location.back()
  }


  navigateToEditInvoice(invoiceID: string) {
    this.router.navigate([
      {
        outlets: {
          modal: ['invoices', invoiceID, 'edit']
        }
      }
    ])
  }

}
