import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { InvoiceService } from '../../services/invoice-service';
import { InvoiceInterface } from '../../shared/invoiceInterface';



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
    console.log(`selected route id = ${ this.selectedInvoiceID }`)

    this.selectedInvoice = this.invoiceService.fetchTargetInvoice( this.selectedInvoiceID as string );
    console.log('selected invoice = ', this.selectedInvoice )
    // console.log('selected invoice id = ', this.selectedInvoice?.id )

    // this.calculateTotalInvoicePrice( this.selectedInvoice );
    this.invoicesGrandTotal = this.calculateGrandInvoiceTotal( this.selectedInvoice )

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

}
