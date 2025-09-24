import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PurchaseGoodreceiptApiUrls } from 'src/app/Urls/PurchaseGoodReceiptApiUrls';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseGoodreceiptServiceService {
private url = environment.apiUrl
 private requestSource = new BehaviorSubject<any>(null);
  currentRequest = this.requestSource.asObservable();
  constructor(private http: HttpClient) { }

   getAll(): Observable<any> {
      return this.http.get<any[]>(this.url + PurchaseGoodreceiptApiUrls.GetAllPurchaseGoodReceipt);
    }

  create(data: any): Observable<any> {
        return this.http.post(this.url+PurchaseGoodreceiptApiUrls.CreatePurchaseGoodReceipt, data);
      }
}
