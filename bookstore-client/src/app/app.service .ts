import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from './config';

@Injectable()
export class AppService {

  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {
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
        const userName = response['name'];
        this.authenticated = !!userName;
        alert('Authentication successful! UserName: ' + userName);

        return callback && callback();
      })
      .catch(response => {
        console.log(response.error);
        alert(response.error.message);
      });
  }
}
