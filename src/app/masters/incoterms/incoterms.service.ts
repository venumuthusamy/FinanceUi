import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncotermsService {

   private url = environment.apiUrl
  private baseUrl = this.url + '/Incoterms/';

  constructor(private http: HttpClient) { }


    getIncoterms(): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl + "getAll");
    }
  
    getIncotermsById(id:any): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl + "get/" + id);
    }
  
    insertIncoterms(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}` + "insert", data);
    }

      updateIncoterms(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteIncoterms(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }
}
