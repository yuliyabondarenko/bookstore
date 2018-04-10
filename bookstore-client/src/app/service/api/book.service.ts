import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../entity/book';
import { environment } from '../../../environments/environment';
import { HttpOptions } from './http-heares-helper';

@Injectable()
export class BookService {
  baseBooksUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {
  }

  getBooks(page: number, size: number, sortParam: string): Promise<any> {
    const booksUrl = `${this.baseBooksUrl}?sort=${sortParam}&page=${page}&size=${size}`;

    return this.http
      .get(booksUrl, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => {
          return response;
        }
      ).catch(error => {
        alert("Error while get books!");
      });
  }

  create(book: Book): Promise<any> {
    return this.http
      .post(this.baseBooksUrl, JSON.stringify(book), HttpOptions.authorizedJsonBody)
      .toPromise()
      .then(response => {
        return response as Book
      })
      .catch(response => alert('Error while create book'));
  }


  update(book: Book): Promise<any> {
    return this.http
      .put(`${this.baseBooksUrl}/${book.id}`, JSON.stringify(book), HttpOptions.authorizedJsonBody)
      .toPromise()
      .then(response => {
        return response as Book
      })
      .catch(response => alert('Error while update book'));
  }
}
