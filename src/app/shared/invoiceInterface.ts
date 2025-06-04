export enum InvoiceStatus {
    paid = "Paid",
    pending = "Pending",
    draft = "Draft"
}


export interface InvoiceItem {
    itemName: string,
    quantity: string,
    price: string,
    itemTotal: string
}


export interface InvoiceInterface {
    id: string,
    invoiceName: string,
    invoiceDate: string,
    invoicePurpose: string,
    clientCompany: string,
    paymentDate: string,
    clientName: string,
    clientEmail: string,
    status: InvoiceStatus,
    items: InvoiceItem[],
    clientCountry?: string,
    clientCity?: string,
    clientStreetName?: string,
    clientStreetNumber?: string
    totalPrice: string
}

