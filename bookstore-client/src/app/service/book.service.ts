import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../config';

@Injectable()
export class BookService {
  bookUrl = `${Config.host}/books`;

  constructor(private http: HttpClient) {
  }

  getBooks(): Promise<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.authorization
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
