import { Injectable } from '@angular/core';
import { Role } from '../model/role';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor() { }
    //unique id to create unique key
    public uniqueId = "sdsb6h53-fg73-b33-6721-k29ig460535";
    private users = [];
    private loaded: boolean = false;

    load(): Promise<boolean> {
      // Return a promise so that we know when this operation has completed 
      // fetching data from local storage is fast, promise can be useful when we fetch from api
      return new Promise((resolve) => {
        if (window.localStorage) {
          // localStorage supported
          if (typeof localStorage !== 'undefined') {
            // We have items in localStroage
            // Get the users that were saved into storage
            let users = JSON.parse(localStorage.getItem("users"+this.uniqueId));
            // Only set this.users to the returned value if there were values stored
            if (users != null) {
              this.users = [...users];
              //this.users = [{id:1,userName:'adminuser',password:'adminpass',firstName:'James',role:Role.Admin},{id:2,userName:'studentuser',password:'stupass',firstName:'Ron',role:Role.Student},{id:3,userName:'teacheruser',password:'teachpass',firstName:'Sharma',role:Role.Teacher}]
            }
            else{
              this.users = [{id:1,userName:'adminuser',password:'adminpass',firstName:'James',role:Role.Admin},{id:2,userName:'studentuser',password:'stupass',firstName:'Ron',role:Role.Student},{id:3,userName:'teacheruser',password:'teachpass',firstName:'Sharma',role:Role.Teacher}]
              this.save();
            }
          }
        }
        // This allows us to check if the data has been loaded in or not
        this.loaded = true;
        resolve(true);
      });
    }

  save(): void {
    let users = this.users;
    // Save the current array of users to storage
    localStorage.setItem("users"+this.uniqueId, JSON.stringify(users));
  }

  getUserById(id: number) {
    return this.users.find(a => id == a.id);
  }

  getUserByNameAndPass(uname,pwd){
    return this.users.find(a => (uname == a.userName && pwd == a.password));
  }

  deleteUser(id){
    let idx = this.users.findIndex(a => id == a.id);
    if(idx>-1){
      this.users.splice(idx, 1);
      this.save();
    }
  }

  createUser(user){
    let lastIdx = this.users.length - 1;
    user.id = this.users[lastIdx].id + 1;
    this.users.push(user);
    this.save();
  }

  updateUser(id,user){
    let idx = this.users.findIndex((obj => obj.id == id));
    if(idx>-1){
      this.users.splice(idx, 1,{...this.users[idx],...user});
      this.save();
    }
  }

  getAllUsers(){
    return this.users;
  }
}
