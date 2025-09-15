import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/state/';

  constructor(private http: HttpClient) { }


  getState(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getStateById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertState(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateState(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteState(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
