import { Injectable } from '@angular/core';
import { User } from "../../entity/user";
import { environment } from "../../../environments/environment";
import { HttpOptions } from "./http-heares-helper";
import { DataRestService } from "./data.rest.service";

@Injectable()
export class UserAccountService extends DataRestService<User> {

  getUserAccount(): Promise<User> {
    let userAccountUrl = `${environment.server.apiPath}/users/search/findUserAccount`;

    return this.http
      .get(userAccountUrl, HttpOptions.authorizedEmptyBody)
      .toPromise()
      .then(response => {
        debugger;
        return response as User;
      })
      .catch(response => Promise.reject(response.error));
  }
}
