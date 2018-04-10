import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../entity/user';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class RegisterService {
  baseUrl = `${environment.apiUrl}/register`;

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Promise<any> {
    return this.http
      .post(this.baseUrl, JSON.stringify(user), httpOptions)
      .toPromise()
      .then(response => response as User)
      .catch(response => this.handleError(response.error));
  }

  private handleError(error) {
    if (error.validationErrors) {
      return Promise.reject(error.validationErrors);
    }
    return Promise.reject(error);
  }
}
