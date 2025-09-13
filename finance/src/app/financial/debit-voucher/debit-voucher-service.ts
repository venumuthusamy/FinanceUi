import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DebitVoucherService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/debitvoucher/';

  constructor(private http: HttpClient) { }

  getDebitVoucher(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getDebitVoucherById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertDebitVoucher(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateDebitVoucher(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteDebitVoucher(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
