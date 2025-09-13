import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerGroupsService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/customergroups/';

  constructor(private http: HttpClient) { }


  getCustomerGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getCustomerGroupsById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertCustomerGroups(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateCustomerGroups(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteCustomerGroups(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
