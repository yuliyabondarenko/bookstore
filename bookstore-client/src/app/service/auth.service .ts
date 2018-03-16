import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../config';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, successCallback, failedCallback) {
    const basicAuth = 'Basic ' + btoa(credentials.username + ':' + credentials.password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': basicAuth
      })
    };

    const authUrl = `${Config.host}/user`;
    this.http.get(authUrl, httpOptions).toPromise()
      .then(response => {
        if ( !!response['name'] ) {
          localStorage.authorization = basicAuth;
        }
        return successCallback && successCallback();
      })
      .catch(response => {
        this.clearAuthorization();

        console.log(response.error);
        return failedCallback && failedCallback(response.error);
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
        this.clearAuthorization(); // because something went wrong
        console.log('Failed logout: ' + response.error.error);
      });
  }

  isAuthorized(): boolean {
    return localStorage.authorization || false;
  }

  clearAuthorization() {
    localStorage.removeItem('authorization');
  }
}
