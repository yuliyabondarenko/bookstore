import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { AuthService } from './auth.service ';

@Injectable()
export class OrderService {
  baseUrl = `${Config.host}/orders`;
  userId: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.userId;
  }

  getOrders(page: number, size: number): Promise<any> {
    const ordersUrl = `${this.baseUrl}/search/findByUserId?userId=${this.userId}
                        &sort=totalAmount,asc
                        &page=${page}&size=${size}
                        &projection=view`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.authorization
      })
    };

    return this.http
      .get(ordersUrl, httpOptions)
      .toPromise()
      .then(response => {
          debugger;
          return response;
        }
      );
  }
}
