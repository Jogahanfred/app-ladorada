import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Dashboard } from '../../../../shared/interface/dashboard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private jsonUrl = `${environment.API}/v1/dashboard`;

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<Dashboard> {
    return this.http
      .get<{ data: Dashboard }>(this.jsonUrl)
      .pipe(map((response) => response.data));
  }
}
