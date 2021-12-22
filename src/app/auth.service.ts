import { Injectable,EventEmitter } from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  jwtToken : string;
  constructor(private dataService : DataService) { }

  authenticate(name : string,password : string) {
    this.dataService.validateUser(name,password).subscribe(
      next=>{
        //valid
        this.jwtToken = next.result
        this.authenticated = true;
        this.authenticationResultEvent.emit(true);
        console.log('jwt token ',this.jwtToken);
      },
      error => {
        // not valid
        this.authenticated = false;
        this.authenticationResultEvent.emit(false);
      }

    );

  }

  getRole() : string{
    if(this.jwtToken == null) return null;
    const encodedPayload = this.jwtToken.split(".")[1];
    const payload = atob(encodedPayload);
    return JSON.parse(payload).role;
  }
}
