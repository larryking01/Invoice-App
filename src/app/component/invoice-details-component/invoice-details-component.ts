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


  ngOnInit(): void {
    this.selectedInvoiceID = this.activeRoute.snapshot.paramMap.get('id')!
    this.selectedInvoice = this.invoiceService.fetchTargetInvoice( this.selectedInvoiceID as string );
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


  navigateToEditInvoice(invoiceID: string | undefined) {
    this.router.navigate([
      {
        outlets: {
          modal: ['invoices', invoiceID, 'edit']
        }
      }
    ])
  }

}
