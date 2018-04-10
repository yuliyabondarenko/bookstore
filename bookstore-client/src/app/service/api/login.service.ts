import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session.service';
import { environment } from '../../../environments/environment';

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

    return this.http.get(`${environment.apiUrl}/user`, httpOptions)
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
    const logoutUrl = `${environment.apiUrl}/logout`;

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
