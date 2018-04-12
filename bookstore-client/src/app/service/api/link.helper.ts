import { environment } from '../../../environments/environment';

export class LinkHelper {

  constructor() { }

  static getUserLink(userId: number): string {
    return `${environment.server.apiPath}/users/${userId}`;
  }
}
