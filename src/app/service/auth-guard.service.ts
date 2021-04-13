import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Role } from '../model/role';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router : Router,private authService: AuthService) { }

  public canActivate(route: ActivatedRouteSnapshot){
    let isAccessible = false;
    let sub = this.authService.currentUser.subscribe(user=> {
      if(user && (user.role == Role.Admin || user.role == Role.Student || user.role == Role.Teacher)){
        isAccessible =  true;
      }
    })
    sub.unsubscribe();
    if(!isAccessible){
      this.router.navigate(["/login"])
    }
    return isAccessible;
  }
}
