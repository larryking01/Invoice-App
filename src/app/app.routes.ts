import { Routes } from '@angular/router';
import { InvoiceListComponent } from './component/invoice-list-component/invoice-list-component';
import { InvoiceDetailsComponent } from './component/invoice-details-component/invoice-details-component';
import { NewInvoiceFormComponent } from './component/new-invoice-form-component/new-invoice-form-component';
import { EditInvoiceFormComponent } from './component/edit-invoice-form-component/edit-invoice-form-component';



export const routes: Routes = [
    { 
        path: '',
        component: InvoiceListComponent,
        title: 'Invoices'
    },
    {
        path: 'invoices/new',
        component: NewInvoiceFormComponent,
        title: 'New invoice',
        outlet: 'modal'
    },
    { 
        path: 'invoices',
        component: InvoiceListComponent,
        title: 'Invoices'
    },
    {
        path: 'invoices/:id/edit',
        component: EditInvoiceFormComponent,
        title: 'Edit invoice',
        outlet: 'modal'
    },
    {
        path: 'invoices/:id',
        component: InvoiceDetailsComponent,
        title: 'Invoice details'
    },
];
