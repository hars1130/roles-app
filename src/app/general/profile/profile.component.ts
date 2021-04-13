import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { AuthService } from 'src/app/service/auth.service';
import { UserDetailsService } from 'src/app/service/user-details.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    })
  });

  constructor(private fb: FormBuilder,private userDetailsService: UserDetailsService,private route: ActivatedRoute,private authService:AuthService,private router : Router) { }
  id;
  createMode=false;
  isAdmin = false;
  ngOnInit(): void {
    this.authService.currentUser.subscribe(u => {
      if(u.role == Role.Admin){
        this.isAdmin = true;
      }
    })
    if(this.route.snapshot.url.join(' ').indexOf('create') > -1){
      this.createMode = true;
    }
    else{
      this.id = this.route.snapshot.params.id;
      let currentUser = this.userDetailsService.getUserById(this.id);
      this.profileForm.patchValue({
        userName: currentUser?.userName,
        password: currentUser?.password,
        role: currentUser?.role,
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName ? currentUser.lastName : '',
        address: this.fb.group({
          street: currentUser?.street,
          city: currentUser?.city,
          state: currentUser?.state,
          zip: currentUser?.zip
        })
      });
    }
  }

  onSubmit() {
    //console.warn(this.profileForm.value);
    if(this.createMode){
      this.userDetailsService.createUser({...this.profileForm.value});
      this.router.navigate(['/admin/users']);
    }
    else{
      this.userDetailsService.updateUser(this.id,{...this.profileForm.value});
    }
  }

}
