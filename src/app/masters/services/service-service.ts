import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxServices {
  
  private url = environment.apiUrl
  private baseUrl = this.url +  '/service/';

  constructor(private http: HttpClient) { }


  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getServicesById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertServices(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateServices(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteServices(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
