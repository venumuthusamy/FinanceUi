import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  
  private storedData: any = null;
  private dataSubject = new BehaviorSubject<any>(null);
  private url = environment.apiUrl
  private baseUrl = this.url + '/meeting/';

  constructor(private http: HttpClient) { }

  setData(value: any): void {
    this.storedData = value;
  }

  getData(): any {
      return this.storedData
  }

   getMeetings(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "getAll");
  }

  getMeetingById(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "get/" + id);
  }

  insertMeeting(data: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}` + "insert", data);
  }

  updateMeeting(id :any,data: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + 'update/' + id, data);
  }

  deleteMeeting(id:any){
     return this.http.delete<any>(`${this.baseUrl}` + "delete/" + id );
  }

}
