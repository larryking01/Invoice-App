import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';


@Component({
  selector: 'invoice-details-component',
  imports: [ Sidebar ],
  templateUrl: './invoice-details-component.html',
  styleUrl: './invoice-details-component.scss'
})
export class InvoiceDetailsComponent {

}
