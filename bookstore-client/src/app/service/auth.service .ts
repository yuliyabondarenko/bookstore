import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../config';

@Injectable()
export class AuthService {

  authenticated = false;

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
        this.authenticated = !!response['name'];
        if ( this.authenticated ) {
          localStorage.authorization = basicAuth;
        }
        return successCallback && successCallback();
      })
      .catch(response => {
        localStorage.authorization = null;

        console.log(response.error);
        return failedCallback && failedCallback(response.error);
      });
  }
}
