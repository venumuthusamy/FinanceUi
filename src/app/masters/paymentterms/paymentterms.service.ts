import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentTermsAPIUrls } from 'src/app/Urls/PaymentTermsAPIUrls';

@Injectable({
  providedIn: 'root'
})
export class PaymentTermsService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any[]>(this.url + PaymentTermsAPIUrls.GetAllPaymentTerms);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.url + PaymentTermsAPIUrls.CreatePaymentTerms, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.url + PaymentTermsAPIUrls.UpdatePaymentTerms}${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url + PaymentTermsAPIUrls.DeletePaymentTerms}${id}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.url + PaymentTermsAPIUrls.GetPaymentTermsById}${id}`);
  }
}
