import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UomService {
  
  private url = environment.apiUrl
  private baseUrl = this.url +  '/uom/';

  constructor(private http: HttpClient) { }


  getUom(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getUomById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertUom(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateUom(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteUom(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
