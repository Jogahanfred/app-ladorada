import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../../../shared/interface/product.interface';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   private jsonUrl = `${environment.API}/v1/productos`;  

   constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
     return this.http.get<{ data: Product[] }>(this.jsonUrl).pipe(
      map(response => response.data)  
    );
  }
}
