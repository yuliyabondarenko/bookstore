import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../config';
import {isNullOrUndefined} from 'util';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isAuthorized(): boolean {
    return !isNullOrUndefined(sessionStorage.authorization);
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
      .then(principal => {
          if (!!principal['name']) {
            this.initSession(basicAuth, principal);
          }
        }
      )
      .catch(response => {
        this.clearAuthorization();
        return Promise.reject(response.error);
      });
  }

  initSession(authorization: String, userPrincipal: Object) {
    sessionStorage.authorization = authorization;
    sessionStorage.userName = userPrincipal['name'];
    this.initRoles(userPrincipal['authorities']);
  }

  initRoles(authorities) {
    sessionStorage.roles = '';
    authorities.forEach(function (item) {
      sessionStorage.roles += item['authority'] + ',';
    });
  }

  logout(): Promise<void> {
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

  clearAuthorization() {
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('roles');
  }

  getAuthorization(): string {
    return sessionStorage.authorization;
  }

  getUserName(): string{
    return sessionStorage.getItem('userName');
  }

  isUser(): boolean {
    return this.hasRole('USER');
  }

  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  hasRole(roleName: string): boolean {
    if (!this.isAuthorized()) {
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
}
