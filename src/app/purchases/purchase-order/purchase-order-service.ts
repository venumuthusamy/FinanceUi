import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/purchaseOrder/';

  constructor(private http: HttpClient) { }


  getPurchaseOrder(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getPurchaseOrderById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertPurchaseOrder(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updatePurchaseOrder(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deletePurchaseOrder(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
