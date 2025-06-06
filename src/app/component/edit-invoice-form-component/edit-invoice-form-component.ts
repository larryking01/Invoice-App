import { Component } from '@angular/core';
import { ReusableInvoiceForm } from '../reusable-invoice-form/reusable-invoice-form';


@Component({
  selector: 'app-edit-invoice-form-component',
  imports: [ReusableInvoiceForm],
  templateUrl: './edit-invoice-form-component.html',
  styleUrl: './edit-invoice-form-component.scss'
})
export class EditInvoiceFormComponent {

}
