import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../entity/user';
import { environment } from '../../../environments/environment';
import { HttpOptions } from './http-heares-helper';

@Injectable()
export class RegisterService {
  baseUrl = `${environment.apiUrl}/register`;

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Promise<any> {
    return this.http
      .post(this.baseUrl, JSON.stringify(user), HttpOptions.anonymouthJsonBody)
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
