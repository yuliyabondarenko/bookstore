import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../entity/user';
import { HttpOptions } from './http-heares-helper';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUser(userUrl): Promise<User> {
    return this.http
      .get(userUrl, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => response as User)
      .catch(response => Promise.reject(response.error));
  }

  deleteUser(user: User): Promise<any> {
    return this.http
      .delete(user._links.self.href, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .catch(response => Promise.reject(response.error));
  }

  updateUser(userUrl: string, user: User): Promise<User> {
    return this.http
      .put(userUrl, JSON.stringify(user), HttpOptions.authorizedJsonBody)
      .toPromise()
      .then(response => response as User)
      .catch(response => Promise.reject(response.error));
  }
}
