import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../entity/order';
import { SessionService } from '../session.service';
import { environment } from '../../../environments/environment';
import { HttpOptions } from './http-heares-helper';

@Injectable()
export class OrderService {
  baseOrdersUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {
  }

  getOrders(userId: number, page: number, size: number, sortParam: string): Promise<any> {
    const userOrdersUrl = `${this.baseOrdersUrl}/search/findByUserId?userId=${userId}`;
    const ordersUrl = `${userOrdersUrl}&sort=${sortParam}&page=${page}&size=${size}&projection=view`;

    return this.http
      .get(ordersUrl, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => {
          return response;
        }
      );
  }

  createOrder(order: Order, successCalback: any): Promise<any> {
    return this.http
      .post(this.baseOrdersUrl, JSON.stringify(order), HttpOptions.authorizedJsonBody)
      .toPromise()
      .then(response => {
        if (successCalback) {
          successCalback();
        }
      })
      .catch(response => {
        alert('Error while order creation!');
      });
  }
}
