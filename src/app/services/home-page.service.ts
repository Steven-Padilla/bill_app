import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill } from '../models/bill';
import { Stakeholder } from '../models/stakeholder';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}
  getAllBills() {
    const headers = new HttpHeaders().append(
      'Authorization',
      `Basic ${this.b64EncodeUnicode('user:123123')}`
    );
    var response = this.http.get<Array<Bill>>(
      'http://localhost:8080/api/v1/bill',
      { headers: headers }
    );

    return response;
  }

  getStakeholder(type: string) {
    const headers = new HttpHeaders().append(
      'Authorization',
      `Basic ${this.b64EncodeUnicode('user:123123')}`
    );
    var response = this.http.get<Array<Stakeholder>>(
      `http://localhost:8080/api/v1/stakeholders/${type}`,
      { headers: headers }
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
