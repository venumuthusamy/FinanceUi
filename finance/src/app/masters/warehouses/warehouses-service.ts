import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/warehouse/';

  constructor(private http: HttpClient) { }


  getWarehouse(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getWarehouseById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertWarehouse(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateWarehouse(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteWarehouse(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
