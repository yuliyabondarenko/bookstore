import { Injectable } from '@angular/core';
import { ShoppingCartItem } from '../../entity/shopping-cart-item';
import { environment } from '../../../environments/environment';
import { HttpOptions } from './http-heares-helper';
import { DataRestService } from "./data.rest.service";

@Injectable()
export class ShoppingCartService extends DataRestService<ShoppingCartItem>{
  baseShopCartUrl = `${environment.server.apiPath}/shopcart`;

  getShopCartItems(): Promise<ShoppingCartItem []> {
    const getUserCartUrl = `${this.baseShopCartUrl}?projection=view`;

    return this.http
      .get(getUserCartUrl, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => {
          return response['_embedded'].shopcart as ShoppingCartItem [];
        }
      )
      .catch(() => {
        console.log(`Get of shopping-cart-items failed`);
        return [];
      });
  }

  cleanCart() {
    return this.http
      .get(`${this.baseShopCartUrl}/clean`, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => {
          return response;
        }
      ).catch(response => Promise.reject(response.error));
  }
}
