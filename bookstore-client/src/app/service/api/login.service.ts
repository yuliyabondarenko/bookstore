import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session.service';
import { environment } from '../../../environments/environment';
import { HttpOptions } from './http-heares-helper';

@Injectable()
export class LoginService {
  loginUrl = `${environment.server.basePath}/user`;
  logoutUrl = `${environment.server.basePath}/logout`;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials): Promise<any> {
    const basicAuth = 'Basic ' + btoa(credentials.username + ':' + credentials.password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': basicAuth
      })
    };

    return this.http.get(this.loginUrl, httpOptions)
      .toPromise()
      .then(userData => {
          if (!!userData['userName']) {
            SessionService.initSession(basicAuth, userData);
          }
        }
      )
      .catch(response => {
        SessionService.clearSession();
        return Promise.reject(response.error);
      });
  }

  logout(): Promise<any> {
    return this.http.get(this.logoutUrl, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => {
        SessionService.clearSession();
      })
      .catch(error => {
        SessionService.clearSession();
        console.log('Logout failed');
      });
  }

}
