import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditVoucherService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/creditvoucher/';

  constructor(private http: HttpClient) { }

  getCreditVoucher(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getCreditVoucherById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertCreditVoucher(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateCreditVoucher(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteCreditVoucher(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
