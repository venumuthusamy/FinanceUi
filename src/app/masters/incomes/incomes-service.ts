import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  
  private url = environment.apiUrl
  private baseUrl = this.url +  '/income/';

  constructor(private http: HttpClient) { }


  getIncome(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getIncomeById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertIncome(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateIncome(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteIncome(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
