import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectionPage } from '../../../model/collection-page';
import { HttpOptions } from '../http-heares-helper';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CollectionPageService<T> {
  basesUrl = `${environment.server.apiPath}`;
  collectionPath: string;
  searchName: string;
  searchParams: string;
  projection: string;

  constructor(private http: HttpClient) {
  }

  getCollectionPage(page: number, size: number, sortParam: string): Promise<CollectionPage<T>> {
    const searchName = this.searchName && this.searchParams ? `/search/${this.searchName}` : '';
    const searchParams = this.searchName && this.searchParams ? `${this.searchParams}&` : '';
    const projection = this.projection ? `&${this.projection}` : '';
    const collectionUrl = `${this.basesUrl}/${this.collectionPath}${searchName}?${searchParams}sort=${sortParam}&page=${page}&size=${size}${projection}`;

    return this.http
      .get(collectionUrl, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => {
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
