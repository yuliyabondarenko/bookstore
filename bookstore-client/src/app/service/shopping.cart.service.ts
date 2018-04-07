import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { AuthService } from './auth.service ';

@Injectable()
export class ShoppingCartService {
  baseUrl: string;
  userId: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.userId;
    this.baseUrl = `${Config.host}/shopcart/search/findByUserId?userId=${this.userId}`;
  }

  getShopCartItems(): Promise<any> {

    const ordersUrl = `${this.baseUrl}&projection=view`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.authorization
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
}
