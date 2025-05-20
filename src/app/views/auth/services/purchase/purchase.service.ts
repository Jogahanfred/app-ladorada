import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../../../../shared/interface/purchase.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private jsonUrl = `${environment.API}/v1/ventas`;

  constructor(private http: HttpClient) {}
  
  getPurchases(): Observable<Purchase[]> {
     return this.http.get<{ data: Purchase[] }>(this.jsonUrl).pipe(
      map(response => response.data)  
    );
  }
  
  savePurchase(purchaseData: Purchase): Observable<any> {
    return this.http.post(this.jsonUrl, purchaseData);
  }
}
