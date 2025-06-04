import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';


@Component({
  selector: 'invoice-list-component',
  imports: [ Sidebar ],
  templateUrl: './invoice-list-component.html',
  styleUrl: './invoice-list-component.scss'
})
export class InvoiceListComponent {
  showInvoices: boolean = true;


}
