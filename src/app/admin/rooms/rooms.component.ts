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

  loadingData = true;
  loadCount = 0;
  errorMsg = 'Please wait.... we are loading data';

  constructor(private dataService:DataService,

              private route:ActivatedRoute,

              private router:Router,

              private formResetService : FormResetService)

  {
   // console.log('constructor of Room component')
  }

  loadData(){
    this.dataService.getRooms().subscribe(
      (next)=>{
        this.rooms = next;
        this.loadingData = false;
        // process url once data is loaded successfully
        this.processUrlParams();
      },
      error => {
        if(error.status === 402){
          this.errorMsg = 'sorry you need to pay to access the service';
        }else{
          this.loadCount++;
          if(this.loadCount <= 10){
            this.errorMsg = 'sorry, something went wrong trying again';
            this.loadData();
          }else {
            this.errorMsg = 'sorry an error occurred plz try again';
          }
        }
      }
    );
  }

  processUrlParams(){
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

  ngOnInit(): void {
    console.log('ngOnInit of Rooms component is called',this);

     this.loadData();



  }

   setRoom(id:number){
    this.router.navigate(['admin','rooms'],{queryParams:{id:id,action:'view'}})
  }

  addRoom(){
   // this.selectedRoom = new Room();
    this.router.navigate(['admin','rooms'],{queryParams:{action:'add'}})
  }

}
