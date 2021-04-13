import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './service/route-guard.service';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    canActivate : [RouteGuardService,AuthGuardService],
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) 
  },
  { 
    path: 'general',
    canActivate : [AuthGuardService], 
    loadChildren: () => import('./general/general.module').then(m => m.GeneralModule) 
  },
  { path: '', redirectTo : 'login', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
