import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { AuthService } from './auth.service ';
import { Order } from '../entity/order';

@Injectable()
export class OrderService {
  ordersUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.ordersUrl = `${Config.host}/orders/search/findByUserId?projection=view&userId=${this.authService.userId}`;
  }

  getOrders(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.authorization
      })
    };

    return this.http
      .get(this.ordersUrl, httpOptions)
      .toPromise()
      .then(response => {
          debugger;
          return response['_embedded'].orders as Order [];
        }
      );
  }
}
