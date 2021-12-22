import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Room} from '../../../model/Room';
import {Router} from '@angular/router';
import {DataService} from '../../../data.service';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input()
  room:Room;
  @Output()
  dataChangedEvent = new EventEmitter();
  message = '';
  isAdminUser = false;
  constructor(private router:Router,
              private dataService : DataService,
              private authService : AuthService) { }

  ngOnInit(): void {
    if(this.authService.getRole() === 'ADMIN'){
      this.isAdminUser = true;
    }
  }

  editRoom() {
    this.router.navigate(['admin','rooms'],{queryParams:{id:this.room.id,action:'edit'}});
  }

  deleteRoom() {
    const result = confirm('Are you sure want to delete?')
    if(result){
      this.dataService.deleteRoom(this.room.id).subscribe(
        next=>{
          this.dataChangedEvent.emit();
          this.router.navigate(['admin','rooms']);
        },
        error => this.message = 'sorry this room can not be deleted at this time.'
      )
    }

  }
}
