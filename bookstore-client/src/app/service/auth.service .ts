import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../config';
import {isNullOrUndefined} from 'util';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isAuthorized(): boolean {
    return !isNullOrUndefined(localStorage.authorization);
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
      .then(response => {
          if ( !!response['name'] ) {
            localStorage.authorization = basicAuth;
            this.initialiseRoles(response['authorities']);
          }
        }
      )
      .catch(response => {
        this.clearAuthorization();
        return Promise.reject(response.error);
      });
  }

  initialiseRoles(authorities) {
    localStorage.roles = '';
    authorities.forEach(function (item) {
      localStorage.roles += item['authority'] + ',';
    });
  }

  logout(): Promise<void> {
    const logoutUrl = `${Config.host}/logout`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.authorization
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
    localStorage.removeItem('authorization');
    localStorage.removeItem('roles');
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
    localStorage.roles.split(',').forEach(function (role) {
      if ( role === roleName ) {
        hasRole = true;
      }
    });
    return hasRole;
  }
}
