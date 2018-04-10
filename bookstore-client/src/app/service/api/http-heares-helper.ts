import { HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session.service';

export class HttpOptions {

  constructor() {
  }

  static get anonymouthJsonBody() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  static get authorizedEmptyBody() {
    return {
      headers: new HttpHeaders({
        'Authorization': SessionService.authorization
      })
    };
  }

  static get authorizedJsonBody() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': SessionService.authorization
      })
    };
  }

}
