import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Bill } from '../models/bill';
import { Stakeholder } from '../models/stakeholder';
import { BillDetails, BillDetailsDTO } from '../models/billdetails';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}
  //TODO:implements dynamic user/password
  header = new HttpHeaders().append(
    'Authorization',
    `Basic ${this.b64EncodeUnicode(`admin:123123`)}`
  );

  deleteDetail(id: number) {
    var response = this.http.delete<Bill>(
      `http://localhost:8080/api/v1/bill/details/${id}`,
      { headers: this.header }
    );
    return response;
  }
  deleteBill(id: number) {
    var response = this.http.delete<Bill>(
      `http://localhost:8080/api/v1/bill/${id}`,
      { headers: this.header }
    );

    return response;
  }
  getAllBills() {
    var response = this.http.get<Array<Bill>>(
      'http://localhost:8080/api/v1/bill',
      { headers: this.header }
    );

    return response;
  }

  getStakeholder(type: string) {
    var response = this.http.get<Array<Stakeholder>>(
      `http://localhost:8080/api/v1/stakeholders/${type}`,
      { headers: this.header }
    );
    return response;
  }
  insertBill(bill: Bill) {
    var response = this.http.post<Bill>(
      `http://localhost:8080/api/v1/bill?issuing=${bill.issuing.id}&receiver=${bill.receiver.id}`,
      bill,
      { headers: this.header }
    );
    return response;
  }
  insertDetail(details: BillDetailsDTO) {
    var response = this.http.post<BillDetails>(
      `http://localhost:8080/api/v1/bill/details`,
      details,
      { headers: this.header }
    );
    return response;
  }
  updateDetail(details: BillDetails, idsToDelete: Array<number>) {
    var response = this.http.post<BillDetails>(
      `http://localhost:8080/api/v1/bill/details`,
      details,
      { headers: this.header }
    );
    for (const item of idsToDelete) {
      if (item > 0) {
        this.deleteDetail(item).subscribe((data) => {
          console.log(data);
        });
      }
    }
    return response;
  }
  updateBill(bill: Bill) {
    var response = this.http.post<Bill>(
      `http://localhost:8080/api/v1/bill?issuing=${bill.issuing.id}&receiver=${bill.receiver.id}`,
      bill,
      { headers: this.header }
    );
    return response;
  }

  login(username: string, pass: string) {
    var response = this.http.post<boolean>(
      `http://localhost:8080/api/v1/auth?username=${username}&password=${pass}`,
      {}
    );
    return response;
  }

  b64EncodeUnicode(str: string): string {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(('0x' + p1) as any);
      })
    );
  }
}
