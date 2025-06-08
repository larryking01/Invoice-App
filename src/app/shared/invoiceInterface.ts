export enum InvoiceStatus {
    paid = "Paid",
    pending = "Pending",
    draft = "Draft"
}


export interface InvoiceItem {
    itemName: string,
    quantity: number,
    price: number,
    itemTotal: number
}


export interface InvoiceInterface {
    id: string,
    status: InvoiceStatus,
    fromStreetAddress: string,
    fromCity: string,
    fromPostCode: string,
    fromCountry: string,
    clientName: string,
    clientEmail: string,
    clientStreetAddress: string,
    clientCountry: string,
    clientCity: string,
    clientPostCode: string,
    invoiceDate: string,
    paymentTerms: string,
    projectDescription: string,
    items: InvoiceItem[],
    // totalPrice: number
}

