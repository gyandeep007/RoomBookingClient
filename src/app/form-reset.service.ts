import { Injectable,EventEmitter } from '@angular/core';
import {Room} from './model/Room';
import {User} from './model/User';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetRoomFormEvent = new EventEmitter<Room>();

  resetUserEvent = new EventEmitter<User>();
  constructor() { }
}
