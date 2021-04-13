import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../model/role';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router,private authService:AuthService) { }

  ngOnInit(): void {
  }
  isCredValid = true;
  form: FormGroup = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });

  submit() {
    if (this.form.valid) {
      if(this.form.get('username')?.value && this.form.get('password')?.value){
        let user = this.authService.authenticateUser(this.form.get('username').value,this.form.get('password').value);
        if(user){
          this.isCredValid = true;
          if(user.role != Role.Admin){
            this.router.navigate([`/general/profile/${user.id}`])
          }
          else{
            this.router.navigate(["/admin/users"])
          }
        }
        else{
          this.isCredValid = false;
        }
      } else {
        alert('enter username and password');
      }
    }
  }
  
}
