import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrencyAPIUrls } from 'src/app/Urls/CurrencyAPIUrls';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any[]>(this.url + CurrencyAPIUrls.GetAllCurrencies);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.url + CurrencyAPIUrls.CreateCurrency, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.url + CurrencyAPIUrls.UpdateCurrency}${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url + CurrencyAPIUrls.DeleteCurrency}${id}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.url + CurrencyAPIUrls.GetCurrencyById}${id}`);
  }
}
