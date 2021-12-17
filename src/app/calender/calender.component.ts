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
  dataLoaded = false;
  message = '';

  constructor(private dataService : DataService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
   this.loadingData();
}

  loadingData(){
    this.route.queryParams.subscribe(
      params => {
        this.selectedDate = params['date'];
        if(!this.selectedDate){
          this.selectedDate = formatDate(new Date(),'yyyy-MM-dd','en-US');
        }
        this.dataService.getBookingsByDate(this.selectedDate).subscribe(
          next=>{
            this.bookings = next;
            this.dataLoaded = true;
            console.log('data',this.bookings);
          }
        );
      }
    );
  }

  deleteBooking(id : number) {
    this.message = 'deleting please wait.....'
    this.dataService.deleteBooking(id).subscribe(
      next=>{
        this.message = '';
        this.loadingData();
      },
      error => this.message = 'sorry there was a problem deleting the booking'
    );
  }

  newBooking() {
    this.router.navigate(['editBookingLoad']);
  }

  updateBooking(id: number) {
    this.router.navigate(['editBookingLoad'],{queryParams:{id:id}});
  }

  dateChanged(){
    this.router.navigate([''],{queryParams:{date : this.selectedDate}});
  }
}
