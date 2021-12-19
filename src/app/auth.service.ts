import { Injectable,EventEmitter } from '@angular/core';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  constructor(private dataService : DataService) { }

  authenticate(name : string,password : string) {
    this.dataService.validateUser(name,password).subscribe(
      next=>{
        //valid
        this.authenticated = true;
        this.authenticationResultEvent.emit(true);
      },
      error => {
        // not valid
        this.authenticated = false;
        this.authenticationResultEvent.emit(false);
      }

    );

  }
}
