import {Layout, Room} from './Room';
import {User} from './User';

export class Booking {
  id: number;
  room: Room;
  user: User;
  layout: Layout;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: number;

  getDateAsDate() {
    return new Date(this.date);
  }

  static fromHttp(booking : Booking) : Booking{
    const  newBooking = new Booking();
    newBooking.id = booking.id;
    newBooking.date = booking.date;
    newBooking.user = User.fromHttp(booking.user);
    newBooking.room = Room.fromHttp(booking.room);
    newBooking.layout = booking.layout;
    newBooking.title = booking.title;
    newBooking.startTime = booking.startTime;
    newBooking.endTime = booking.endTime;
    newBooking.participants = booking.participants;

    return newBooking;
  }
}
