import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../config';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isAuthorized(): boolean {
    return localStorage.authorization || false;
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
          }
        }
      )
      .catch(response => {
        this.clearAuthorization();
        return Promise.reject(response.error);
      });
  }

  clearAuthorization() {
    localStorage.removeItem('authorization');
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
}
