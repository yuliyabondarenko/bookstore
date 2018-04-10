import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Config } from '../config';
import { SessionService } from './session.service';

@Injectable()
export class LinkHelper {

  constructor() { }

  static getUserLink(userId: number): string {
    return `${Config.host}/users/${userId}`;
  }
}
