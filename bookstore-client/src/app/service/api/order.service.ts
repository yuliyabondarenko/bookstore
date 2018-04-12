import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../entity/order';
import { environment } from '../../../environments/environment';
import { HttpOptions } from './http-heares-helper';

@Injectable()
export class OrderService {
  baseOrdersUrl = `${environment.server.apiPath}/orders`;

  constructor(private http: HttpClient) {
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
      .catch(error => Promise.reject(error));
  }
}
