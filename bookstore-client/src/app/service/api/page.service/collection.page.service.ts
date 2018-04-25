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

  constructor(private http: HttpClient) {
  }

  getCollectionPage(page: number, size: number, sortParam: string): Promise<CollectionPage<T>> {
    const searchName = this.searchName && this.searchParams ? `/search/${this.searchName}` : '';
    const searchParams = this.searchName && this.searchParams ? `${this.searchParams}&` : '';
    const collectionUrl = `${this.basesUrl}/${this.collectionPath}${searchName}?${searchParams}sort=${sortParam}&page=${page}&size=${size}`;

    return this.http
      .get(collectionUrl, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => {
        let collection = response['_embedded'][this.collectionPath] as Array<T>;
        let totalElements =  response['page'] ? response['page'].totalElements : collection.length;
        return new CollectionPage(
            collection,
            totalElements
          );
        }
      ).catch(error => {
        console.log(`Get ${this.collectionPath} failed. Error: ${error.message}`);
        return new CollectionPage([], 0);
      });
  }
}
