import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Config } from '../config';
import { LinkHelper } from './link.helper';

@Injectable()
export class SessionService {

  constructor() { }

  get isAuthorized(): boolean {
    return !isNullOrUndefined(sessionStorage.authorization);
  }

  get authorization(): string {
    return sessionStorage.authorization;
  }

  get userLink(): string {
    const userId = parseInt(sessionStorage.getItem('userId'));
    return LinkHelper.getUserLink(userId);
  }

  get userId(): number {
    return parseInt(sessionStorage.getItem('userId'));
  }

  get userName(): string {
    return sessionStorage.getItem('userName');
  }

  get isUser(): boolean {
    return this.hasRole('USER');
  }

  get isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  private hasRole(roleName: string): boolean {
    if (!this.isAuthorized) {
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
