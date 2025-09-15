import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/country/';

  constructor(private http: HttpClient) { }


  getCountry(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getCountryById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertCountry(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateCountry(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteCountry(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
