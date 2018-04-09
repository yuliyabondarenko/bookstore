import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../config';
import { Order } from '../../entity/order';
import { SessionService } from '../session.service';

@Injectable()
export class OrderService {
  baseOrdersUrl = `${Config.host}/orders`;
  userOrdersUrl: string;
  userId: number;

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.userId = this.sessionService.userId;
    this.userOrdersUrl = `${this.baseOrdersUrl}/search/findByUserId?userId=${this.userId}`;
  }

  getOrders(page: number, size: number, sortParam: string): Promise<any> {
    const ordersUrl = `${this.userOrdersUrl}&sort=${sortParam}&page=${page}&size=${size}&projection=view`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.sessionService.authorization
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
        'Authorization': this.sessionService.authorization
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
