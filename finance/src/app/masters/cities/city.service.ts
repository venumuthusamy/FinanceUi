import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  
  private url = environment.apiUrl
  private baseUrl = this.url + '/city/';

  constructor(private http: HttpClient) { }


  getCity(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getCityById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertCity(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateCity(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteCity(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
