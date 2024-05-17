import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill } from '../models/bill';
import { Stakeholder } from '../models/stakeholder';
import { BillDetails, BillDetailsDTO } from '../models/billdetails';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().append(
    'Authorization',
    `Basic ${this.b64EncodeUnicode('user:123123')}`
  );


  deleteBill(id:number) {
    var response = this.http.delete<Bill>(
      `http://localhost:8080/api/v1/bill/${id}`,
      { headers: this.headers }
    );

    return response;
  }
  getAllBills() {
    var response = this.http.get<Array<Bill>>(
      'http://localhost:8080/api/v1/bill',
      { headers: this.headers }
    );

    return response;
  }

  getStakeholder(type: string) {
    var response = this.http.get<Array<Stakeholder>>(
      `http://localhost:8080/api/v1/stakeholders/${type}`,
      { headers: this.headers }
    );
    return response;
  }
  insertBill(bill: Bill) {
    var response = this.http.post<Bill>(
      `http://localhost:8080/api/v1/bill?issuing=${bill.issuing.id}&receiver=${bill.receiver.id}`,
      bill,
      { headers: this.headers }
    );
    return response;
  }
  insertDetail(details: BillDetailsDTO) {
    var response = this.http.post<BillDetails>(
      `http://localhost:8080/api/v1/bill/details`,
      details,
      { headers: this.headers }
    );
    return response;
  }
  updateDetail(details: BillDetails) {
    var response = this.http.post<BillDetails>(
      `http://localhost:8080/api/v1/bill/details`,
      details,
      { headers: this.headers }
    );
    return response;
  }
  updateBill(bill: Bill) {
    var response = this.http.post<Bill>(
      `http://localhost:8080/api/v1/bill?issuing=${bill.issuing.id}&receiver=${bill.receiver.id}`,
      bill,
      { headers: this.headers }
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
