import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../config';
import { SessionService } from './session.service';

@Injectable()
export class BookService {
  baseBooksUrl = `${Config.host}/books`;

  constructor(private http: HttpClient,
              private sessionService: SessionService,) {
  }

  getBooks(page: number, size: number, sortParam: string): Promise<any> {
    const booksUrl = `${this.baseBooksUrl}?sort=${sortParam}&page=${page}&size=${size}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.sessionService.authorization
      })
    };

    return this.http
      .get(booksUrl, httpOptions)
      .toPromise()
      .then(response => {
          return response;
        }
      ).catch(error => {
        alert("Error while get books!");
      });
  }
}
