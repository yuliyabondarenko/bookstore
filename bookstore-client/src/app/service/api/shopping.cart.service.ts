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

  getShopCartItems(userId): Promise<any> {
    const getUserCartUrl = `${this.baseShopCartUrl}/search/findByUserId?userId=${userId}&projection=view`;

    return this.http
      .get(getUserCartUrl, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => {
          return response;
        }
      );
  }

  deleteItem(id: number): Promise<any> {
    return this.http
      .delete(`${this.baseShopCartUrl}/${id}`)
      .toPromise()
      .catch(response => {
        alert(`Error while delete shopping-cart: ${id}`);
      });
  }

  cleanUserCart(userId: number){
    return this.http
      .get(`${this.baseShopCartUrl}/clean?userId=${userId}`, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => {
          return response;
        }
      );
  }

  createItem(shoppingCartItem: ShoppingCartItemDTO): Promise<any> {
    return this.http
      .post(`${this.baseShopCartUrl}?projection=view`, JSON.stringify(shoppingCartItem), HttpOptions.authorizedJsonBody)
      .toPromise()
      .then(response => response as ShoppingCartItem)
      .catch(response => {
        alert('Error while save shopping-cart');
      });
  }

  updateItem(shoppingCartItem: ShoppingCartItemDTO): Promise<any> {
    const itemUrl = `${this.baseShopCartUrl}/${shoppingCartItem.id}?projection=view`;

    return this.http
      .put(itemUrl, JSON.stringify(shoppingCartItem), HttpOptions.authorizedJsonBody)
      .toPromise()
      .then(response => response as ShoppingCartItem)
      .catch(response => {
        alert('Error while update shopping-cart');
      });
  }
}
