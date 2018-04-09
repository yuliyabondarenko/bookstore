import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { SessionService } from './session.service';

@Injectable()
export class UserGuard implements CanActivate {


  constructor(private sessionService: SessionService,) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.sessionService.isUser;
  }
}
