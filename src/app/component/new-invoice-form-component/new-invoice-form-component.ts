import { Component } from '@angular/core';
// import { Sidebar } from '../sidebar/sidebar';
import { ReusableInvoiceForm } from '../reusable-invoice-form/reusable-invoice-form';


@Component({
  selector: 'app-new-invoice-form-component',
  imports: [ReusableInvoiceForm],
  templateUrl: './new-invoice-form-component.html',
  styleUrl: './new-invoice-form-component.scss'
})
export class NewInvoiceFormComponent {

}
