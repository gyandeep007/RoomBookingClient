import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {Room} from '../../model/Room';
import {ActivatedRoute, Router} from '@angular/router';
import {FormResetService} from '../../form-reset.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms:Array<Room>;
  action:string;

  selectedRoom:Room;

  constructor(private dataService:DataService,

              private route:ActivatedRoute,

              private router:Router,

              private formResetService : FormResetService)

  {
   // console.log('constructor of Room component')
  }

  ngOnInit(): void {
    console.log('ngOnInit of Rooms component is called',this);

  this.dataService.getRooms().subscribe(
    (next)=>{
      this.rooms = next;
    }
  );


  this.route.queryParams.subscribe(
    (params)=>{
      const id = params['id'];
      this.action = params['action'];
      if(id){
        this.selectedRoom = this.rooms.find(room => room.id===+id);//to convert string into number just add + sign
      }
      if(this.action == 'add'){
        this.selectedRoom = new Room();
        // generate event in case of adding new room
        this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
      }
    }
  );
  }

   setRoom(id:number){
    this.router.navigate(['admin','rooms'],{queryParams:{id:id,action:'view'}})
  }

  addRoom(){
   // this.selectedRoom = new Room();
    this.router.navigate(['admin','rooms'],{queryParams:{action:'add'}})
  }

}
