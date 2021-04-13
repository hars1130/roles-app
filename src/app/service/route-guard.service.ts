import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Role } from '../model/role';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private authService: AuthService) { }

  public canActivate(route: ActivatedRouteSnapshot){
    let isAccessible = false;
    let sub = this.authService.currentUser.subscribe(user=> {
      if(user && user.role == Role.Admin){
        isAccessible =  true;
      }
    })
    sub.unsubscribe();
    return isAccessible;
  }

}
