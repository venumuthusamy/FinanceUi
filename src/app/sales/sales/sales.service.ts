import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesInnerService {
  private url = environment.apiUrl
  private storedData: any = null;
  private baseUrl = this.url + '/sale/';

  constructor(private http: HttpClient) { }

  setData(value: any): void {
    this.storedData = value;
  }

  getData(): any {
      return this.storedData
  }

  getSales(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getSalesById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertSales(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateSales(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteSales(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }
}
