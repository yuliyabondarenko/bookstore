import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectionPage } from '../../../model/collection-page';
import { HttpOptions } from '../http-heares-helper';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CollectionPageService<T> {
  basesUrl = `${environment.apiUrl}`;
  collectionPath: string;

  constructor(private http: HttpClient) {
  }

  getCollectionPage(page: number, size: number, sortParam: string): Promise<CollectionPage<T>> {
    const booksUrl = `${this.basesUrl}/${this.collectionPath}?sort=${sortParam}&page=${page}&size=${size}`;

    return this.http
      .get(booksUrl, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => {
          debugger;
          return new CollectionPage(
            response['_embedded'][this.collectionPath] as Array<T>,
            response['page'].totalElements
          );
        }
      ).catch(error => {
        console.log(`Get ${this.collectionPath} failed. Error: ${error.message}`);
        return new CollectionPage([], 0);
      });
  }
}
