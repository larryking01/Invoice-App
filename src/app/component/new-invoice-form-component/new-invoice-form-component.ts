import { Component, inject } from '@angular/core';
import { InvoiceService } from '../../services/invoice-service';
import { InvoiceInterface, InvoiceStatus } from '../../shared/invoiceInterface';
// import { InvoiceStatus } from '../../shared/invoiceInterface';
import { ReusableInvoiceForm } from '../reusable-invoice-form/reusable-invoice-form';


@Component({
  selector: 'app-new-invoice-form-component',
  imports: [ReusableInvoiceForm],
  templateUrl: './new-invoice-form-component.html',
  styleUrl: './new-invoice-form-component.scss'
})
export class NewInvoiceFormComponent {
  invoiceService = inject( InvoiceService );
  form_submit_type: string = ''

  getFormSubmitType( formSubmitType: string ) {
    this.form_submit_type = formSubmitType;
  }

  addNewInvoice( newInvoice: InvoiceInterface ) {
    if( this.form_submit_type === 'save') {
      let invoiceToAdd: InvoiceInterface = {
        ...newInvoice,
        id: this.invoiceService.generateInvoiceId(),
        status: InvoiceStatus.pending
      }

      this.invoiceService.createInvoice( invoiceToAdd );
    }
    else {
      let invoiceToAdd: InvoiceInterface = {
        ...newInvoice,
        id: this.invoiceService.generateInvoiceId(),
        status: InvoiceStatus.draft
      }
      
      this.invoiceService.createInvoice( invoiceToAdd );
    }
  }


}
