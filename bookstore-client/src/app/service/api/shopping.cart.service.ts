import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShoppingCartItem } from '../../entity/shopping-cart-item';
import { ShoppingCartItemDTO } from '../../entity/shopping-cart-item-dto';
import { SessionService } from '../session.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ShoppingCartService {
  baseShopCartUrl = `${environment.apiUrl}/shopcart`;
  userId: number;

  constructor(private http: HttpClient,
              private sessionService: SessionService) {
    this.userId = this.sessionService.userId;
  }

  getShopCartItems(): Promise<any> {

    const getUserCartUrl = `${this.baseShopCartUrl}/search/findByUserId?userId=${this.userId}&projection=view`;

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
      .delete(`${this.baseShopCartUrl}/${id}`)
      .toPromise()
      .catch(response => {
        alert(`Error while delete shopping-cart: ${id}`);
      });
  }

  cleanUserCart(userId: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.sessionService.authorization
      })
    };

    return this.http
      .get(`${this.baseShopCartUrl}/clean?userId=${userId}`, httpOptions)
      .toPromise()
      .then(response => {
          return response;
        }
      );
  }

  createItem(shoppingCartItem: ShoppingCartItemDTO): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.sessionService.authorization
      })
    };

    return this.http
      .post(`${this.baseShopCartUrl}?projection=view`, JSON.stringify(shoppingCartItem), httpOptions)
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

    const itemUrl = `${this.baseShopCartUrl}/${shoppingCartItem.id}?projection=view`;
    return this.http
      .put(itemUrl, JSON.stringify(shoppingCartItem), httpOptions)
      .toPromise()
      .then(response => response as ShoppingCartItem)
      .catch(response => {
        alert('Error while update shopping-cart');
      });
  }
}
