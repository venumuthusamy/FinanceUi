import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OpeningBalanceService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/openingBalance/';

  constructor(private http: HttpClient) { }

  getAccountHead(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAllAccountHead");
  }
  getBalanceType(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAllBalanceType");
  }

  getOpeningBalance(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getOpeningBalanceById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertOpeningBalance(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateOpeningBalance(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

}
