import { isNullOrUndefined } from 'util';
import { ShoppingCartItem } from '../entity/shopping-cart-item';

export class SessionService {

  constructor() {
  }

  static get isAuthorized(): boolean {
    return !isNullOrUndefined(sessionStorage.authorization);
  }

  static get authorization(): string {
    return sessionStorage.authorization;
  }

  static get userId(): number {
    return parseInt(sessionStorage.getItem('userId'));
  }

  static get userName(): string {
    return sessionStorage.getItem('userName');
  }

  static get isUser(): boolean {
    return this.hasRole('USER');
  }

  static get isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  static get itemsInCart(): boolean {
    return sessionStorage.shoppingCart ? JSON.parse(sessionStorage.shoppingCart).length : 0;
  }

  private static hasRole(roleName: string): boolean {
    if (!SessionService.isAuthorized) {
      return false;
    }
    let hasRole = false;
    sessionStorage.roles.split(',').forEach(function (role) {
      if (role === roleName) {
        hasRole = true;
      }
    });
    return hasRole;
  }

  static initSession(authorization: String, userData: any) {
    sessionStorage.authorization = authorization;
    sessionStorage.userId = userData['userId'];
    sessionStorage.userName = userData['userName'];
    sessionStorage.roles = userData['roles'];
  }


  static clearAuthorization() {
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('shoppingCart');
  }

}
