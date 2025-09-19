import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseAPIUrls } from 'src/app/Urls/PurchaseAPIUrls';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequisitionService {
private url = environment.apiUrl
  constructor(private http: HttpClient) { }
   getAll(): Observable<any> {
    return this.http.get<any[]>(this.url + PurchaseAPIUrls.GetAllPurchaseRequests);
  }

  // POST
  create(data: any): Observable<any> {
    return this.http.post(this.url+PurchaseAPIUrls.CreatePurchaseRequest, data);
  }

  // PUT
update(id: number, data: any): Observable<any> {
  return this.http.put(`${this.url + PurchaseAPIUrls.UpdatePurchaseRequest}${id}`, data);
}

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url + PurchaseAPIUrls.DeletePurchaseRequest}${id}`);
  }
}
