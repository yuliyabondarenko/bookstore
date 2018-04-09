import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { ShoppingCartItem } from '../entity/shopping-cart-item';
import { ShoppingCartItemDTO } from '../entity/shopping-cart-item-dto';
import { SessionService } from './session.service';

@Injectable()
export class ShoppingCartService {
  cartsUrl = `${Config.host}/shopcart`;
  userId: number;

  constructor(private http: HttpClient,
              private sessionService: SessionService) {
    this.userId = this.sessionService.userId;
  }

  getShopCartItems(): Promise<any> {

    const getUserCartUrl = `${this.cartsUrl}/search/findByUserId?userId=${this.userId}&projection=view`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.sessionService.authorization
      })
    };

    return this.http
      .get(getUserCartUrl, httpOptions)
      .toPromise()
      .then(response => {
          return response;
        }
      );
  }

  deleteItem(id: number): Promise<any> {
    return this.http
      .delete(`${this.cartsUrl}/${id}`)
      .toPromise()
      .catch(response => {
        alert(`Error while delete shopping-cart: ${id}`);
      });
  }

  createItem(shoppingCartItem: ShoppingCartItemDTO): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.sessionService.authorization
      })
    };

    return this.http
      .post(`${this.cartsUrl}?projection=view`, JSON.stringify(shoppingCartItem), httpOptions)
      .toPromise()
      .then(response => response as ShoppingCartItem)
      .catch(response => {
        alert('Error while save shopping-cart');
      });
  }

  updateItem(shoppingCartItem: ShoppingCartItemDTO): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.sessionService.authorization
      })
    };

    const itemUrl = `${this.cartsUrl}/${shoppingCartItem.id}?projection=view`;
    return this.http
      .put(itemUrl, JSON.stringify(shoppingCartItem), httpOptions)
      .toPromise()
      .then(response => response as ShoppingCartItem)
      .catch(response => {
        alert('Error while update shopping-cart');
      });
  }
}
