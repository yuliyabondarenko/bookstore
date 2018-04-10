import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingCartItem } from '../../entity/shopping-cart-item';
import { ShoppingCartItemDTO } from '../../entity/shopping-cart-item-dto';
import { environment } from '../../../environments/environment';
import { HttpOptions } from './http-heares-helper';

@Injectable()
export class ShoppingCartService {
  baseShopCartUrl = `${environment.apiUrl}/shopcart`;

  constructor(private http: HttpClient) {
  }

  getShopCartItems(userId): Promise<ShoppingCartItem []> {
    const getUserCartUrl = `${this.baseShopCartUrl}/search/findByUserId?userId=${userId}&projection=view`;

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

  deleteItem(item: ShoppingCartItem): Promise<any> {
    return this.http
      .delete(item._links.self.href)
      .toPromise()
      .catch(response => {
        console.log(`Delete shopping-cart failed`);
      });
  }

  cleanUserCart(userId: number) {
    return this.http
      .get(`${this.baseShopCartUrl}/clean?userId=${userId}`, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => {
          return response;
        }
      ).catch(response => {
        console.log(`Clean shopping-cart failed`);
      });
  }

  createItem(shoppingCartItem: ShoppingCartItemDTO): Promise<any> {
    return this.http
      .post(`${this.baseShopCartUrl}?projection=view`, JSON.stringify(shoppingCartItem), HttpOptions.authorizedJsonBody)
      .toPromise()
      .then(response => response as ShoppingCartItem)
      .catch(response => {
        console.log(`Create shopping-cart-item failed`);
      });
  }

  updateItem(shoppingCartItem: ShoppingCartItemDTO): Promise<any> {
    const itemUrl = `${this.baseShopCartUrl}/${shoppingCartItem.id}?projection=view`;

    return this.http
      .put(itemUrl, JSON.stringify(shoppingCartItem), HttpOptions.authorizedJsonBody)
      .toPromise()
      .then(response => response as ShoppingCartItem)
      .catch(() => {
        console.log(`Update shopping-cart-item failed`);
      });
  }
}
