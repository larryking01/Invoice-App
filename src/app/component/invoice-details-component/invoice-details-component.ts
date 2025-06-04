import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';


@Component({
  selector: 'invoice-details-component',
  imports: [ Sidebar ],
  templateUrl: './invoice-details-component.html',
  styleUrl: './invoice-details-component.scss'
})
export class InvoiceDetailsComponent implements OnInit {
  router = inject( Router )
  location = inject( Location )
  activeRoute = inject( ActivatedRoute )

  selectedInvoiceID: string | null = null;

  ngOnInit(): void {
    this.selectedInvoiceID = this.activeRoute.snapshot.paramMap.get('id')
    // console.log(`selected route id = ${ this.selectedInvoiceID }`)
  }

  goBackNavigation() {
    this.location.back()
  }

}
