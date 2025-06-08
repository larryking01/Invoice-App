import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Sidebar } from '../sidebar/sidebar';
import { InvoiceService } from '../../services/invoice-service';
import { InvoiceInterface } from '../../shared/invoiceInterface';
import { InvoiceStatus } from '../../shared/invoiceInterface';
import { PrependDotPipe } from '../../pipes/prepend-dot-pipe';


@Component({
  selector: 'invoice-details-component',
  imports: [ CommonModule, Sidebar, PrependDotPipe],
  templateUrl: './invoice-details-component.html',
  styleUrl: './invoice-details-component.scss'
})
export class InvoiceDetailsComponent implements OnInit {
  router = inject( Router )
  location = inject( Location )
  activeRoute = inject( ActivatedRoute )
  invoiceService = inject( InvoiceService )
  selectedInvoiceID: string = '';
  selectedInvoice$!: Observable<InvoiceInterface | undefined>;
  // invoiceItemTotalPrice: number = 0;
  invoicesGrandTotal: number = 0;
  showDeleteModal: boolean = false;
  chosenInvoice: InvoiceInterface | undefined = undefined;
  


  ngOnInit(): void {
    this.selectedInvoiceID = this.activeRoute.snapshot.paramMap.get('id')!
    this.selectedInvoice$ = this.invoiceService.getInvoiceById$(this.selectedInvoiceID);
    this.chosenInvoice = this.invoiceService.fetchTargetInvoice( this.selectedInvoiceID )
    this.invoicesGrandTotal = this.calculateGrandInvoiceTotal( this.chosenInvoice )

    this.hideDeleteModal()
    console.log("selected invoice$ = ", this.selectedInvoice$ )

  }

  showDeleteModalTrue() {
    this.showDeleteModal = true
    console.log( this.showDeleteModal )
  }

  hideDeleteModal() {
    this.showDeleteModal = false
  }


  deleteInvoice(invoice: InvoiceInterface) {
    this.invoiceService.deleteInvoice( invoice );
    this.hideDeleteModal()
    this.router.navigate(['invoices'])
  }


  // markAsPaid(invoice: InvoiceInterface) {
  //   invoice.status === "Paid"
  // }


  // updateSelectedInvoice(currentInvoice: InvoiceInterface, updatedInvoice: InvoiceInterface) {
  //   this.invoiceService.updateInvoice( currentInvoice, updatedInvoice )
  //   this.selectedInvoiceID = this.activeRoute.snapshot.paramMap.get('id')!
  //   this.selectedInvoice = this.invoiceService.fetchTargetInvoice( this.selectedInvoiceID as string );

  // }

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
