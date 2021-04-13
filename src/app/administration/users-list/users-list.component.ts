import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsService } from 'src/app/service/user-details.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private router : Router,private userDetailsService:UserDetailsService) { }
  displayedColumns: string[] = ['select','id', 'firstName', 'lastName'];
  dataSource = [];

  ngOnInit(): void {
    this.dataSource = [...this.userDetailsService.getAllUsers()];
  }

  deleteItem(row){
    this.userDetailsService.deleteUser(row.id);
    this.dataSource = [...this.userDetailsService.getAllUsers()];
  }

  updateItem(row){
    this.router.navigate([`/general/profile/${row.id}`]);
  }

  createNewUser(){
    this.router.navigate(["/general/profile/create/"]);
  }
}
