import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/customer/';

  constructor(private http: HttpClient) { }


  getCustomer(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getCustomerById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertCustomer(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateCustomer(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteCustomer(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
