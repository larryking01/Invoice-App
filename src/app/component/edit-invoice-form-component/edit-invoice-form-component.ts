import { Component, inject, OnInit } from '@angular/core';
import { ReusableInvoiceForm } from '../reusable-invoice-form/reusable-invoice-form';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice-service';
import { InvoiceInterface } from '../../shared/invoiceInterface';

@Component({
  selector: 'app-edit-invoice-form-component',
  imports: [ReusableInvoiceForm],
  templateUrl: './edit-invoice-form-component.html',
  styleUrl: './edit-invoice-form-component.scss'
})
export class EditInvoiceFormComponent implements OnInit {
  invoiceToEdit: InvoiceInterface | undefined = undefined;
  activatedRoute = inject( ActivatedRoute )
  invoiceService = inject( InvoiceService )
  currentInvoice: any = ''
  updatedInvoice: any = ''


  ngOnInit(): void {
    let invoiceToEditID = this.activatedRoute.snapshot.paramMap.get('id');

    if( invoiceToEditID ) {
      this.invoiceToEdit = this.invoiceService.fetchTargetInvoice( invoiceToEditID );
      console.log("invoice to edit = ", this.invoiceToEdit )
    }
  }

  editInvoice( event: { original: InvoiceInterface, updated: InvoiceInterface} ) {
    this.invoiceService.updateInvoice( event.original, event.updated )
    // this.invoiceService.fetchInvoices()
  }

}
