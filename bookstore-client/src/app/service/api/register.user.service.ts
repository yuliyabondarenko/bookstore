import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../entity/user';
import { environment } from '../../../environments/environment';
import { HttpOptions } from './http-heares-helper';

@Injectable()
export class RegisterService {
  registerUrl = `${environment.server.basePath}/register`;

  constructor(private http: HttpClient) {
  }

  registerUser(user: User): Promise<User> {
    return this.http
      .post(this.registerUrl, JSON.stringify(user), HttpOptions.anonymouthJsonBody)
      .toPromise()
      .then(response => response as User)
      .catch(response => {
        return Promise.reject(response.error);
      });
  }
}
