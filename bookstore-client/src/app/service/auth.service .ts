import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { isNullOrUndefined } from 'util';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  get isAuthorized(): boolean {
    return !isNullOrUndefined(sessionStorage.authorization);
  }

  get authorization(): string {
    return sessionStorage.authorization;
  }

  get userId(): string {
    return sessionStorage.getItem('userId');
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

  authenticate(credentials): Promise<any> {
    const basicAuth = 'Basic ' + btoa(credentials.username + ':' + credentials.password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': basicAuth
      })
    };

    return this.http.get(`${Config.host}/user`, httpOptions)
      .toPromise()
      .then(userData => {
          if (!!userData['userId']) {
            this.initSession(basicAuth, userData);
          }
        }
      )
      .catch(response => {
        this.clearAuthorization();
        return Promise.reject(response.error);
      });
  }

  private initSession(authorization: String, userData: Object) {
    sessionStorage.authorization = authorization;
    sessionStorage.userId = userData['userId'];
    sessionStorage.userName = userData['userName'];
    sessionStorage.roles = userData['roles'];
  }

  logout(): Promise<any> {
    const logoutUrl = `${Config.host}/logout`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': sessionStorage.authorization
      })
    };

    return this.http.get(logoutUrl, httpOptions)
      .toPromise()
      .then(response => {
        this.clearAuthorization();
      })
      .catch(response => {
        this.clearAuthorization();
        console.log('Failed logout: ' + response.error.error);
      });
  }

  private clearAuthorization() {
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('roles');
  }
}
