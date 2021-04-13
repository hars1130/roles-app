import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../model/role';
import { User } from '../model/user';
import { UserDetailsService } from './user-details.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private user: User;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private userDetailsService: UserDetailsService) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
   }

  /*
  isAuthorized() {
      return !!this.user;
  }

  hasRole(role: Role) {
      return this.isAuthorized() && this.user.role === role;
  }*/

  authenticateUser(uname,pwd){
    let user = this.userDetailsService.getUserByNameAndPass(uname,pwd);
    if(user){
      this.login(user);
    }
    return user;
  }

  login(user){
    //this.user = {...user};
    this.currentUserSubject.next(user);
  }

  logout() {
    //this.user = null;
    this.currentUserSubject.next(null);
  }

}
