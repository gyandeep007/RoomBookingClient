import { Component, OnInit } from '@angular/core';
import {Booking} from '../model/Booking';
import {DataService} from '../data.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {formatDate} from '@angular/common';
import {User} from '../model/User';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {


  bookings : Array<Booking>;
  selectedDate:string;

  constructor(private dataService : DataService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.dataService.getUser(1).subscribe(
      next=>{
        console.log(next);
        console.log(typeof next);
        console.log(next.getAuthority())
      }
    )


    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if(!this.selectedDate){
          this.selectedDate = formatDate(new Date(),'yyyy-MM-dd','en-US');
        }
        this.dataService.getBookings(this.selectedDate).subscribe(
          next=>{
            this.bookings = next;
          }
        );
      }
    );


  }

  deleteBooking(id : number) {
    console.log('going to delete with id ',id);
    this.dataService.deleteBooking(id).subscribe(
      next=>{
        this.router.navigate(['']);
      }
    );
  }

  newBooking() {
    this.router.navigate(['addBooking']);
  }

  updateBooking(id: number) {
    this.router.navigate(['editBooking'],{queryParams:{id:id}});
  }

  dateChanged(){
    this.router.navigate([''],{queryParams:{date : this.selectedDate}});
  }
}
