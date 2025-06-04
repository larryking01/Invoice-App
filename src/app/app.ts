import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceListComponent } from "./component/invoice-list-component/invoice-list-component";
import { InvoiceDetailsComponent } from './component/invoice-details-component/invoice-details-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InvoiceListComponent, InvoiceDetailsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Invoice_App';
}
