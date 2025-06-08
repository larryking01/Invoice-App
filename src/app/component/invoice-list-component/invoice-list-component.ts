import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../sidebar/sidebar';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice-service';
import { InvoiceInterface } from '../../shared/invoiceInterface';
import { PrependDotPipe } from '../../pipes/prepend-dot-pipe';

@Component({
  selector: 'invoice-list-component',
  imports: [ CommonModule, Sidebar,PrependDotPipe, FormsModule],
  templateUrl: './invoice-list-component.html',
  styleUrl: './invoice-list-component.scss'
})
export class InvoiceListComponent implements OnInit {
  router = inject( Router );
  invoiceService = inject( InvoiceService );
  invoicesArray: InvoiceInterface[] = [];
  filterableInvoicesArray: InvoiceInterface[] = []
  listFilter: string = '0'

  ngOnInit(): void {
    this.invoiceService.allInvoicesArray$.subscribe( data => {
      this.invoicesArray = data;
      this.filterableInvoicesArray = data;
      console.log('invoices array = ', this.invoicesArray);
    })

  }


  handleFiltering(filter: string) {
    switch (filter) {
      case '0':
        this.filterableInvoicesArray = this.invoicesArray;
        break;
      case '1':
        this.filterableInvoicesArray = this.invoicesArray.filter(invoice => invoice.status === 'Draft');
        break;
      case '2':
        this.filterableInvoicesArray = this.invoicesArray.filter(invoice => invoice.status === 'Pending');
        break;
      case '3':
        this.filterableInvoicesArray = this.invoicesArray.filter(invoice => invoice.status === 'Paid');
        break;
      default:
        this.filterableInvoicesArray = this.invoicesArray;
        break;
    }
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
