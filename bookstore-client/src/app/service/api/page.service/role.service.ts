import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HttpOptions } from '../http-heares-helper';

@Injectable()
export class RoleService {
  constructor(private http: HttpClient) {
  }

  getRoleUrlByName(name): Promise<string> {
    const roleUrl = `${environment.server.apiPath}/userRoles/search/findOneByName?name=${name}`;

    return this.http
      .get(roleUrl, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(role => role['_links'].self.href )
      .catch(response => Promise.reject(response.error));
  }
}
