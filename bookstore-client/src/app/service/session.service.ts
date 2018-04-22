import { UserSessionData } from '../model/user-session-data';
import { isNullOrUndefined } from 'util';
import { ShoppingCartItem } from '../entity/shopping-cart-item';

export class SessionService {

  constructor() {
  }

  static initSession(authorization: string, userData: any) {
    let userSessionData = <UserSessionData>userData;
    userSessionData.authorization = authorization;

    sessionStorage.userData = JSON.stringify(userSessionData);
  }

  static clearSession() {
    sessionStorage.removeItem('userData');
  }

  static getUserSessionData(): UserSessionData {
    if(sessionStorage.userData) {
      return JSON.parse(sessionStorage.userData) as UserSessionData;
    } else {
      return new UserSessionData();
    }
  }

  static get isAuthorized(): boolean {
    return !isNullOrUndefined(SessionService.authorization);
  }

  static get authorization(): string {
    return SessionService.getUserSessionData().authorization;
  }

  static get userName(): string {
    return SessionService.getUserSessionData().userName;
  }

  static get isCustomer(): boolean {
    return this.hasRole('CUSTOMER');
  }

  static get isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  private static hasRole(roleName: string): boolean {
    return SessionService.getUserSessionData().roles
      .some(role => role === roleName);
  }


  static get shoppingCartItems() : Array<ShoppingCartItem> {
    return SessionService.getUserSessionData().shoppingCartItems;
  }

  static set shoppingCartItems(shoppingCart: Array<ShoppingCartItem>) {
    let sessionData = SessionService.getUserSessionData();
    sessionData.shoppingCartItems = shoppingCart;
    sessionStorage.userData = JSON.stringify(sessionData);
  }

  static get itemsInCart(): number {
    let shoppingCartItems = SessionService.shoppingCartItems;
    return shoppingCartItems ? shoppingCartItems.length : 0;
  }
}
