import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeductionService {
  
  private url = environment.apiUrl
  private baseUrl = this.url +  '/deduction/';

  constructor(private http: HttpClient) { }


  getDeduction(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getDeductionById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertDeduction(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateDeduction(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteDeduction(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
