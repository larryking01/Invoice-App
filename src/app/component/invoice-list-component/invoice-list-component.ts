import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice-service';
import { InvoiceInterface } from '../../shared/invoiceInterface';
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
  invoicesArray: InvoiceInterface[] = [];


  ngOnInit(): void {
    this.invoiceService.fetchInvoices();
    this.invoiceService.allInvoicesArray$.subscribe( data => {
      this.invoicesArray = data;
      console.log('invoices array = ', this.invoicesArray);
    })
  }

  navigateToInvoiceDetails(invoiceID: string | undefined ) {
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


}
