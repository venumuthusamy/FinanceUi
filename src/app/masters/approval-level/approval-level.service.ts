import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApprovalLevelAPIUrls } from 'src/app/Urls/ApprovalLevelAPIUrls';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovalLevelService {
private url = environment.apiUrl
  constructor(private http: HttpClient) { }
    getAll(): Observable<any> {
      return this.http.get<any[]>(this.url + ApprovalLevelAPIUrls.GetAllApprovalLevelRequests);
    }
  
    // POST
    create(data: any): Observable<any> {
      return this.http.post(this.url+ApprovalLevelAPIUrls.CreateApprovalLevelRequest, data);
    }
  
    // PUT
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.url + ApprovalLevelAPIUrls.UpdateApprovalLevelRequest}${id}`, data);
  }
  
    // DELETE
    delete(id: number): Observable<any> {
      return this.http.delete(`${this.url + ApprovalLevelAPIUrls.DeleteApprovalLevelRequest}${id}`);
    }
    GetPurchaseById(id: number): Observable<any> {
      return this.http.get(`${this.url + ApprovalLevelAPIUrls.GetApprovalLevelRequestById}${id}`);
    }
}
