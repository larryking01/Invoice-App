import { Routes } from '@angular/router';
import { InvoiceListComponent } from './component/invoice-list-component/invoice-list-component';
import { InvoiceDetailsComponent } from './component/invoice-details-component/invoice-details-component';



export const routes: Routes = [
    { 
        path: '',
        component: InvoiceListComponent,
        title: 'Invoices'
    },
    { 
        path: 'invoices',
        component: InvoiceListComponent,
        title: 'Invoices'
    },
    {
        path: 'invoices/:id',
        component: InvoiceDetailsComponent,
        title: 'Invoice details'
    }
];
