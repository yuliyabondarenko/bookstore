import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from './config';

@Injectable()
export class AppService {

  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, successCallback, failedCallback) {
    const auth64 = btoa(credentials.username + ':' + credentials.password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth64
      })
    };

    const authUrl = `${Config.host}/user`;
    this.http.get(authUrl, httpOptions).toPromise()
      .then(response => {
        this.authenticated = !!response['name'];
        return successCallback && successCallback();
      })
      .catch(response => {
        console.log(response.error);
        return failedCallback && failedCallback(response.error);
      });
  }
}
