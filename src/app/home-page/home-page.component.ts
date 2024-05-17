import { Component, OnInit } from '@angular/core';
import { Stakeholder } from '../models/stakeholder';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from '../services/home-page.service';
import { Bill } from '../models/bill';
import { BillDetails, BillDetailsDTO } from '../models/billdetails';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  modalAction: string = 'new';
  listDetailsHandler: Array<
    FormGroup<{
      id: FormControl<any>;
      item: FormControl<any>;
      quantity: FormControl<any>;
      singlePrice: FormControl<any>;
      description: FormControl<any>;
      total: FormControl<any>;
    }>
  > = [
    new FormGroup({
      id: new FormControl(),
      item: new FormControl(),
      quantity: new FormControl(),
      singlePrice: new FormControl(),
      description: new FormControl(),
      total: new FormControl(),
    }),
  ];
  formBill = new FormGroup({
    serialNumber: new FormControl(),
    id: new FormControl(),
    folio: new FormControl(),
    date: new FormControl(),
    paymentType: new FormControl(),
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
          100,
          0
        ),
        new BillDetails(
          0,
          'Product 2',
          1,
          100.0,
          'Description of product 2',
          100,
          0
        ),
      ]
    ),
  ];
  listIssuing: Array<Stakeholder> = [];
  listReceiver: Array<Stakeholder> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
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
    this.toaster.show('Espera un momento', 'Enviando...');

    const newBill = new Bill(
      this.modalAction == 'new' ? null : this.formBill.value.id,
      this.formBill.value.folio,
      this.formBill.value.serialNumber,
      this.formBill.value.date,
      this.formBill.value.paymentType,
      this.formBill.value.total,
      this.listReceiver.find(
        (item) => item.id == this.formBill.value.receiverId
      )!,
      this.listIssuing.find(
        (item) => item.id == this.formBill.value.issuingId
      )!,
      []
    );
    if (this.modalAction == 'new') {
      this.billService.insertBill(newBill).subscribe((res) => {
        for (var i = 0; i < this.listDetailsHandler.length; i++) {
          const newBilldetail = new BillDetailsDTO(
            this.listDetailsHandler[i].value.item,
            this.listDetailsHandler[i].value.quantity,
            this.listDetailsHandler[i].value.singlePrice,
            this.listDetailsHandler[i].value.description,
            this.listDetailsHandler[i].value.singlePrice *
              this.listDetailsHandler[i].value.quantity,
            res.id
          );
          this.billService
            .insertDetail(newBilldetail)
            .subscribe((detailResponse) => {
              this.ngOnInit();
            });
        }
        this.toaster.success('Factura guardada correctamente', 'TODO OK :)');
      });
    } else {
      this.billService.updateBill(newBill).subscribe((res) => {
        for (var i = 0; i < this.listDetailsHandler.length; i++) {
          const newBilldetail = new BillDetails(
            this.listDetailsHandler[i].value.id,
            this.listDetailsHandler[i].value.item,
            this.listDetailsHandler[i].value.quantity,
            this.listDetailsHandler[i].value.singlePrice,
            this.listDetailsHandler[i].value.description,
            this.listDetailsHandler[i].value.singlePrice *
              this.listDetailsHandler[i].value.quantity,
            res.id
          );
          this.billService
            .updateDetail(newBilldetail)
            .subscribe((detailResponse) => {
              this.ngOnInit();
            });
        }
        this.toaster.success('Factura editada correctamente', 'TODO OK :)');
      });
    }
  }

  clearData() {
    this.listDetailsHandler = [
      new FormGroup({
        id: new FormControl(),
        item: new FormControl(),
        quantity: new FormControl(),
        singlePrice: new FormControl(),
        description: new FormControl(),
        total: new FormControl(),
      }),
    ];
    this.modalAction = 'new';
    this.formBill.setValue({
      date: null,
      folio: null,
      issuingId: null,
      receiverId: null,
      paymentType: null,
      serialNumber: null,
      total: null,
      id: null,
    });
  }

  setForm(editingBill: Bill, action: string) {
    this.modalAction = action;
    this.listDetailsHandler = [];
    this.detailsIdToDelete = [];

    for (var i = 0; i < editingBill.billDetails.length; i++) {
      this.listDetailsHandler.push(
        new FormGroup({
          id: new FormControl(editingBill.billDetails[i].id),
          item: new FormControl(editingBill.billDetails[i].item),
          quantity: new FormControl(editingBill.billDetails[i].quantity),
          singlePrice: new FormControl(editingBill.billDetails[i].singlePrice),
          description: new FormControl(editingBill.billDetails[i].description),
          total: new FormControl(editingBill.billDetails[i].total),
        })
      );
    }
    if (action == 'view') {
      for (var i = 0; i < this.listDetailsHandler.length; i++) {
        this.listDetailsHandler[i].disable();
      }
      this.formBill.disable();
    } else {
      this.formBill.enable();
    }

    this.formBill.setValue({
      date: editingBill.date,
      folio: editingBill.invoice,
      issuingId: editingBill.issuing?.id ?? null,
      receiverId: editingBill.receiver?.id ?? null,
      paymentType: editingBill.paymentType,
      serialNumber: editingBill.serialNumber,
      total: editingBill.total,
      id: editingBill.id,
    });
  }

  addDetail() {
    this.listDetailsHandler.push(
      new FormGroup({
        id: new FormControl(this.listDetailsHandler.length - 10),
        item: new FormControl(),
        quantity: new FormControl(),
        singlePrice: new FormControl(),
        description: new FormControl(),
        total: new FormControl(),
      })
    );
  }

  idToDelete: number = -1;
  setDeleteItem(id: number) {
    this.idToDelete = id;
  }
  deleteBill() {
    this.toaster.warning('Espera un momento', 'Eliminando...');

    this.billService.deleteBill(this.idToDelete).subscribe((res) => {
      this.ngOnInit();
      this.toaster.success('Factura eliminada con exito', 'TODO OK :)');
    });
  }

  detailsIdToDelete: Array<number> = [];
  deleteDetailLocal(id: number) {
    this.detailsIdToDelete.push(id);
    this.listDetailsHandler = this.listDetailsHandler.filter(
      (item) => item.value.id != id
    );
  }
}
