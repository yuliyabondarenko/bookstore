import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../config';
import { SessionService } from '../session.service';

@Injectable()
export class LoginService {

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

    return this.http.get(`${Config.host}/user`, httpOptions)
      .toPromise()
      .then(userData => {
          if (!!userData['userId']) {
            SessionService.initSession(basicAuth, userData);
          }
        }
      )
      .catch(response => {
        SessionService.clearAuthorization();
        return Promise.reject(response.error);
      });
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
        SessionService.clearAuthorization();
      })
      .catch(response => {
        SessionService.clearAuthorization();
        console.log('Failed logout: ' + response.error.error);
      });
  }

}
