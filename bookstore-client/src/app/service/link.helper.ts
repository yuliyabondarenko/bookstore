import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export class LinkHelper {

  constructor() { }

  static getUserLink(userId: number): string {
    return `${environment.apiUrl}/users/${userId}`;
  }
}
