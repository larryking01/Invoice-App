import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { InvoiceService } from '../../services/invoice-service';
import { InvoiceInterface } from '../../shared/invoiceInterface';



@Component({
  selector: 'invoice-details-component',
  imports: [ Sidebar ],
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

  ngOnInit(): void {
    this.selectedInvoiceID = this.activeRoute.snapshot.paramMap.get('id')!
    console.log(`selected route id = ${ this.selectedInvoiceID }`)

    this.selectedInvoice = this.invoiceService.fetchTargetInvoice( this.selectedInvoiceID as string );
    console.log('selected invoice = ', this.selectedInvoice )
    console.log('selected invoice id = ', this.selectedInvoice?.clientCity )

  }

  goBackNavigation() {
    this.location.back()
  }

}
