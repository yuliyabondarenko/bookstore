import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../../entity/order';
import { SessionService } from '../session.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class OrderService {
  baseOrdersUrl = `${environment.apiUrl}/orders`;
  userOrdersUrl: string;
  userId: number;

  constructor(private http: HttpClient) {
    this.userId = SessionService.userId;
    this.userOrdersUrl = `${this.baseOrdersUrl}/search/findByUserId?userId=${this.userId}`;
  }

  getOrders(page: number, size: number, sortParam: string): Promise<any> {
    const ordersUrl = `${this.userOrdersUrl}&sort=${sortParam}&page=${page}&size=${size}&projection=view`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': SessionService.authorization
      })
    };

    return this.http
      .get(ordersUrl, httpOptions)
      .toPromise()
      .then(response => {
          return response;
        }
      );
  }

  createOrder(order: Order, successCalback: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': SessionService.authorization
      })
    };

    return this.http
      .post(this.baseOrdersUrl, JSON.stringify(order), httpOptions)
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
