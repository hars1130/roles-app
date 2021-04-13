import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './model/role';
import { AuthService } from './service/auth.service';
import { UserDetailsService } from './service/user-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'roles-app';
  constructor(private router: Router, private authService: AuthService,private userDetailsService: UserDetailsService) { }

  ngOnInit(): void {
    this.userDetailsService.load();
    this.authService.currentUser.subscribe(u =>{
      if(u && u.id){
        this.isAuthorized = !!u.id;
        this.isAdmin = u.role === Role.Admin;
        this.id = u.id;
      }
      else{
        this.isAuthorized = false;
        this.isAdmin = false;
        this.id = null;
      }
    })
  }
  isAuthorized = false;
  isAdmin = false;
  id;
  /*
  get isAuthorized() {
    return this.authService.isAuthorized();
  }

  get isAdmin() {
    return this.authService.hasRole(Role.Admin);
  }*/

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
