import { Component, OnInit } from '@angular/core';
import { Stakeholder } from '../models/stakeholder';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from '../services/home-page.service';
import { Bill } from '../models/bill';
import { BillDetails } from '../models/billdetails';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  modalAction: string = 'new';
  formBill = new FormGroup({
    serialNumber: new FormControl(),
    id: new FormControl(),
    folio: new FormControl(),
    date: new FormControl(''),
    paymentType: new FormControl('Targeta'),
    total: new FormControl(),
    issuingId: new FormControl(),
    receiverId: new FormControl(),
  });
  listData = [
    new Bill(
      0,
      12345, // invoice number
      6789, // serial number
      '2024-05-15', // date
      'Credit Card', // payment type
      1000.0, // total amount
      // Stakeholder object for receiver
      new Stakeholder(1, 'John Doe', 'AB123456789', 'Customer'),
      // Stakeholder object for issuer
      new Stakeholder(2, 'Acme Corporation', 'ACME12345678', 'Supplier'),
      // Array of BillDetailModel objects
      [
        new BillDetails(
          0,
          'Product 1',
          2,
          50.0,
          'Description of product 1',
          100
        ),
        new BillDetails(
          0,
          'Product 2',
          1,
          100.0,
          'Description of product 2',
          100
        ),
      ]
    ),
  ];
  listIssuing: Array<Stakeholder> = [];
  listReceiver: Array<Stakeholder> = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private billService: HomePageService
  ) {}
  ngOnInit() {
    this.billService.getAllBills().subscribe((res) => {
      this.listData = res;
    });
    this.billService.getStakeholder('emisor').subscribe((res) => {
      this.listIssuing = res;
    });
    this.billService.getStakeholder('receptor').subscribe((res) => {
      this.listReceiver = res;
    });
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.formBill.value);
  }

  clearData() {
    this.modalAction = 'new';
    this.formBill.value.date = '';
    this.formBill.value.folio = '';
    this.formBill.value.issuingId = '';
    this.formBill.value.receiverId = '';
    this.formBill.value.paymentType = '';
    this.formBill.value.serialNumber = '';
    this.formBill.value.total = '';
  }

  setForm(editingBill: Bill, action: string) {
    this.modalAction = action;
    if (action == 'view') {
      this.formBill.disable();
    } else {
      this.formBill.enable();
    }
    this.formBill.value.id = editingBill.id;
    this.formBill.value.date = editingBill.date;
    this.formBill.value.folio = editingBill.invoice;
    this.formBill.value.issuingId = editingBill.issuing?.id ?? 0;
    this.formBill.value.receiverId = editingBill.receiver?.id ?? 0;
    this.formBill.value.paymentType = editingBill.paymentType;
    this.formBill.value.serialNumber = editingBill.serialNumber;
    this.formBill.value.total = editingBill.total;
  }
}
