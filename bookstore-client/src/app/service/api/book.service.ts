import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { SessionService } from '../session.service';
import { Book } from '../../entity/book';
import { environment } from '../../../environments/environment';

@Injectable()
export class BookService {
  baseBooksUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {
  }

  getBooks(page: number, size: number, sortParam: string): Promise<any> {
    const booksUrl = `${this.baseBooksUrl}?sort=${sortParam}&page=${page}&size=${size}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': SessionService.authorization
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

  create(book: Book): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': SessionService.authorization
      })
    };

    return this.http
      .post(this.baseBooksUrl, JSON.stringify(book), httpOptions)
      .toPromise()
      .then(response => {
        return response as Book
      })
      .catch(response => alert('Error while create book'));
  }


  update(book: Book): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': SessionService.authorization
      })
    };

    return this.http
      .put(`${this.baseBooksUrl}/${book.id}`, JSON.stringify(book), httpOptions)
      .toPromise()
      .then(response => {
        return response as Book
      })
      .catch(response => alert('Error while update book'));
  }
}
