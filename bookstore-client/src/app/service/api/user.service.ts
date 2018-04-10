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
export class UserService {
  baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  getUser(userUrl): Promise<any> {
    return this.http
      .get(userUrl)
      .toPromise()
      .then(response => response as User)
      .catch(response => this.handleError(response.error));
  }

  getUsers(page: number, size: number): Promise<any> {
    const usersUrl = `${this.baseUrl}?page=${page}&size=${size}`;
    return this.http
      .get(usersUrl)
      .toPromise()
      .then(response => response)
      .catch(response => this.handleError(response.error));
  }

  deleteUser(user: User): Promise<any> {
    return this.http
      .delete(user._links.user.href)
      .toPromise()
      .catch(response => this.handleError(response.error));
  }

  createUser(user: User): Promise<any> {
    return this.http
      .post(this.baseUrl, JSON.stringify(user), httpOptions)
      .toPromise()
      .then(response => response as User)
      .catch(response => this.handleError(response.error));
  }

  updateUser(userUrl: string, user: User): Promise<any> {
    return this.http
      .put(userUrl, JSON.stringify(user), httpOptions)
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
