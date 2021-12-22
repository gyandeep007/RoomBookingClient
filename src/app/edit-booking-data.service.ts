import { Injectable } from '@angular/core';
import {Room} from './model/Room';
import {User} from './model/User';
import {DataService} from './data.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditBookingDataService {

  rooms:Array<Room>;
  users:Array<User>;
  dataLoaded = 0;
  constructor(private dataService : DataService,
              private authService : AuthService) {
    this.dataService.getRooms(this.authService.jwtToken).subscribe(
      next=>{
        this.rooms = next;
        this.dataLoaded++;
      }
    );

    this.dataService.getUsers().subscribe(
      next=> {
        this.users = next;
        this.dataLoaded++;
      }
    );
  }
}
