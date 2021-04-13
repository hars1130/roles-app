import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { AdministrationRoutingModule } from './administration-routing.module';
import { UsersListComponent } from './users-list/users-list.component';


@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
