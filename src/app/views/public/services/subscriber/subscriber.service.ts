import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from '../../../../shared/interface/subscriber.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  private jsonUrl = `${environment.API}/v1/subscribers`;

  constructor(private http: HttpClient) {}

  saveSubscriber(subscriberData: Subscriber): Observable<any> {
    return this.http.post(this.jsonUrl, subscriberData);
  }
}
