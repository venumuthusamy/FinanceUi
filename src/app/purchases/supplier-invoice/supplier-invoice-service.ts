import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierInvoiceService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/purchase/';

  constructor(private http: HttpClient) { }


  getSupplierPurchase(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getSupplierPurchaseById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertSupplierPurchase(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateSupplierPurchase(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteSupplierPurchase(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }
}
