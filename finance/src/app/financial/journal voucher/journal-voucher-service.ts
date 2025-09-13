import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JournalVoucherService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/journalvoucher/';

  constructor(private http: HttpClient) { }

  getJournalVoucher(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getJournalVoucherById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertJournalVoucher(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateJournalVoucher(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteJournalVoucher(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
