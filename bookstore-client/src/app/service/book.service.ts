import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../config';
import {AuthService} from './auth.service ';

@Injectable()
export class BookService {
  bookUrl = `${Config.host}/books`;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getBooks(): Promise<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.authorization
      })
    };

    return this.http
      .get(this.bookUrl, httpOptions)
      .toPromise()
      .then(response => {
          return response;
        }
      );
  }
}
