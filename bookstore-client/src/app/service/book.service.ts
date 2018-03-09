import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../config';

@Injectable()
export class BookService {
  bookUrl = `${Config.host}/books`;

  constructor(private http: HttpClient) {
  }

  getBooks(): Promise<any> {

    return this.http
      .get(this.bookUrl)
      .toPromise()
      .then(response => {
          return response;
        }
      );
  }
}
