import {Component, OnInit} from '@angular/core';
import {EditBookingDataService} from '../../edit-booking-data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-booking-load',
  templateUrl: './edit-booking-load.component.html',
  styleUrls: ['./edit-booking-load.component.css']
})
export class EditBookingLoadComponent implements OnInit {

  constructor(private editLoadDataService: EditBookingDataService,
              private router: Router,
              private routes: ActivatedRoute) {
  }

  ngOnInit(): void {
    setTimeout(() => this.navigateWhenReady(), 1000);
  }

  navigateWhenReady() {
    //check to see if service data is loaded
    if (this.editLoadDataService.dataLoaded === 2) {
      //if yes, we will navigate to edit component
      const id = this.routes.snapshot.queryParams['id'];
      if(id){
          this.router.navigate(['editBooking'], {queryParams: {id: id}});
      }else{
        this.router.navigate(['addBooking']);
      }

    } else {
      //else wait for 500ms then retry
      setTimeout(() => this.navigateWhenReady(), 500);

    }

  }

}
