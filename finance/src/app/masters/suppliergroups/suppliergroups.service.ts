import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierGroupsService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/suppliergroups/';

  constructor(private http: HttpClient) { }


  getSupplierGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getSupplierGroupsById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertSupplierGroups(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateSupplierGroups(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteSupplierGroups(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
