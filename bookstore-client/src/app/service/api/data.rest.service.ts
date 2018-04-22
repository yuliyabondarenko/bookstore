import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpOptions } from './http-heares-helper';
import { Entity } from '../../entity/entity';

@Injectable()
export class DataRestService<T extends Entity> {
  constructor(protected http: HttpClient) {
  }

  get(resourceUrl: string): Promise<T> {
    return this.http
      .get(resourceUrl, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => response as T)
      .catch(response => Promise.reject(response.error));
  }

  delete(resource: T): Promise<any> {
    return this.http
      .delete(resource._links['self'].href, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .catch(response => Promise.reject(response.error));
  }

  create(resource: T): Promise<T> {
    let resourcePath = `${environment.server.apiPath}/${resource.collectionName}`;

    return this.http
      .post(resourcePath, JSON.stringify(resource), HttpOptions.authorizedJsonBody)
      .toPromise()
      .then(response => response as T)
      .catch(response => Promise.reject(response.error));
  }

  update(resource: T): Promise<T> {
    return this.http
      .put(resource._links['self'].href,
        JSON.stringify(resource), HttpOptions.authorizedJsonBody)
      .toPromise()
      .then(response => response as T
      )
      .catch(response => Promise.reject(response.error));
  }
}
