import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from './model/Room';
import {User} from './model/User';
import {Observable, of} from 'rxjs';
import {Booking} from './model/Booking';
import {formatDate} from '@angular/common';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {root} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  getRooms() : Observable<Array<Room>>{

    return this.http.get<Array<Room>>(environment.restUrl+'/api/rooms')
      .pipe(
        map(data=>{
          const rooms = new Array<Room>();
          for(const room of data){
            rooms.push(Room.fromHttp(room));
          }
          return rooms;
        })
      );
  }

  getUsers() : Observable<Array<User>>{
    return this.http.get<Array<User>>(environment.restUrl+'/api/users')
      .pipe(
        map(data=>{
          const users = new Array<User>();
          for(const user of data){
            users.push(User.fromHttp(user));
          }
          return users;
        })
      );
  }

  updateUser(user:User):Observable<User>{
    return this.http.put<User>(environment.restUrl+'/api/users',user);
  }

  addUser(newUser:User,password: string):Observable<User>{
    const fullUser = {name:newUser.name,password:password};
    return this.http.post<User>(environment.restUrl+'/api/users',fullUser);

  }
  private getCorrectedRoom(room : Room){
    const correctedRoom = {id:room.id,name:room.name,location:room.location,capacities:[]};

    for(const lc of room.capacities){
      let correctLayout ;
      for(const member in Layout){
        if(Layout[member] === lc.layout){
          correctLayout = member;
        }
      }
      const correctedLayout = {capacity:lc.capacity,layout:correctLayout};
      correctedRoom.capacities.push(correctedLayout);
    }
    return correctedRoom;
  }
  updateRoom(room : Room) : Observable<Room>{

    return this.http.put<Room>(environment.restUrl+'/api/rooms',this.getCorrectedRoom(room));
  }

  addRoom(newRoom : Room) : Observable<Room>{
    console.log('sending post request ',newRoom);
    return this.http.post<Room>(environment.restUrl+'/api/rooms',this.getCorrectedRoom(newRoom));
  }

  deleteUser(id : Number) : Observable<any>{
    return this.http.delete(environment.restUrl+'/api/users/'+id);
  }

  deleteRoom(id : Number) : Observable<any>{
    return this.http.delete<Room>(environment.restUrl+'/api/rooms/'+id);
  }

  resetUserPassword(id : number) : Observable<any>{
    return this.http.get<User>(environment.restUrl+'/api/users/resetPassword/'+id);
  }


  getBookingsByDate(date : string) : Observable<Array<Booking>>{
    return this.http.get<Array<Booking>>(environment.restUrl+'/api/bookings/'+date)
      .pipe(
        map(data=>{
          const bookings = new Array<Booking>();
          for(const booking of data){
            bookings.push(Booking.fromHttp(booking));
          }
          return bookings;
        })
      );
  }

  getBookings() : Observable<Array<Booking>>{
    return this.http.get<Array<Booking>>(environment.restUrl+'/api/bookings')
      .pipe(
        map(data=>{
          const bookings = new Array<Booking>();
           for (const booking of data){
             console.log('type of booking',typeof booking)
             console.log('processing ',booking);
             bookings.push(Booking.fromHttp(booking));
           }
          return bookings;
        })
      );
  }

  getBooking(id : number) : Observable<Booking>{
    return this.http.get<Booking>(environment.restUrl+'/api/bookings?id='+id)
      .pipe(
        map(data=>Booking.fromHttp(data))
      );
  }

  addBooking(newBooking : Booking) : Observable<Booking>{
    return this.http.post<Booking>(environment.restUrl+'/api/bookings',this.getCorrectedBooking(newBooking));
  }

  updateBooking(booking : Booking) : Observable<Booking>{
    return this.http.put<Booking>(environment.restUrl+'/api/bookings',this.getCorrectedBooking(booking));
  }

  deleteBooking(id : number) : Observable<any>{
    return   this.http.delete<Array<Booking>>(environment.restUrl+'/api/bookings/'+id);
  }

  validateUser(name : string,password : string) : Observable<string>{
    const  authData = btoa(`${name}:${password}`);
    const headers = new HttpHeaders().append('Authorization','Basic '+authData);
   return this.http.get<string>(environment.restUrl+'/api/basicAuth/validate',{headers:headers});
  }

  constructor(private http: HttpClient) {

    console.log(environment.restUrl);
  }

  getCorrectedBooking(booking : Booking){

    let correctLayout ;
    for(const member in Layout){
      if(Layout[member] === booking.layout){
        correctLayout = member;
      }
    }
    const correctBooking = {id:booking.id,room:this.getCorrectedRoom(booking.room),user:booking.user,layout:correctLayout,title:booking.title,
      date:booking.date,startTime:booking.startTime,endTime:booking.endTime,participants:booking.participants}
    console.log('booking ',correctBooking);
    return correctBooking;
  }

  getUser(id:number):Observable<User>{
   return  this.http.get<User>(environment.restUrl+'/api/users/'+id)
     .pipe(
       map(data=>{
         return User.fromHttp(data);
       })
     );
  }


}
