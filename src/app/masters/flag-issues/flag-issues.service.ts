import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlagIssuesService {
 private url = environment.apiUrl
  private baseUrl = this.url + '/FlagIssues/';
  constructor(private http: HttpClient) { }


      getFlagIssues(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl + "getAll");
      }
    
      getFlagIssuesById(id:any): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl + "get/" + id);
      }
    
      insertFlagIssues(data: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}` + "insert", data);
      }
  
        updateFlagIssues(id :any,data: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'update/' + id, data);
    }
  
    deleteFlagIssues(id:any){
       return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
    }
}
