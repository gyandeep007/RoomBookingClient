import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuardService implements CanActivate{

  constructor(private authService : AuthService,
              private router : Router) { }

  canActivate(route : ActivatedRouteSnapshot,state : RouterStateSnapshot):  boolean  {
     if(!this.authService.authenticated){

       this.router.navigate(['login'],{queryParams:{requestedUrl:state.url}});
     }
     return this.authService.authenticated;
  }
}
