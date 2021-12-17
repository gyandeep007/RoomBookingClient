import {Component, Input, OnDestroy, OnInit, EventEmitter, Output} from '@angular/core';
import {Layout, LayoutCapacity, Room} from '../../../model/Room';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';
import {FormResetService} from '../../../form-reset.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit,OnDestroy {

  @Input()
  room:Room;
  @Output()
  dataChangeEvent = new EventEmitter();

  layouts=Object.keys(Layout);
  layoutEnums=Layout;

  roomForm : FormGroup;
  resetEventSubscription : Subscription;
  message='';

  constructor(private formBuilder : FormBuilder,
              private dataService : DataService,
              private router : Router,
              private fromResetService : FormResetService) { }



  ngOnInit(): void {
    console.log('room edit ng On it method called')
   this.initializeForm();
   this.resetEventSubscription =  this.fromResetService.resetRoomFormEvent.subscribe(
      room=>{
        this.room = room;
        this.initializeForm();
      }
    )
  }

  initializeForm(){
    this.roomForm = this.formBuilder.group({
      roomName : [this.room.name,Validators.required],
      location : [this.room.location,[Validators.required,Validators.minLength(2)]]
    });

    for (const layout of this.layouts){
      const layoutCapacity = this.room.capacities.find(lc=>lc.layout===Layout[layout]);
      const initialCapacity = layoutCapacity == null?0:layoutCapacity.capacity;
      this.roomForm.addControl(`layout${layout}`,this.formBuilder.control(initialCapacity));
    }
  }

  onSubmit() {
    this.message = 'Saving.......'
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.value['location'];
    this.room.capacities = new Array<LayoutCapacity>();
    for (const layout of this.layouts){
     const layoutCapacity = new LayoutCapacity();
     layoutCapacity.layout=Layout[layout];
     layoutCapacity.capacity= this.roomForm.controls[`layout${layout}`].value;
    //  this.roomForm.addControl(`layout${layout}`,new FormControl(`layout${layout}`));
      this.room.capacities.push(layoutCapacity);
    }

   if(this.room.id == null){
     this.dataService.addRoom(this.room).subscribe(
       next=>{
         this.dataChangeEvent.emit();
         this.router.navigate(['admin','rooms'],{queryParams:{id:next.id,action:'view'}})
       },
       error => this.message = 'Something went wrong. You may wish to try again.'
     );
   }else{
     this.dataService.updateRoom(this.room).subscribe(
       next=>{
         this.dataChangeEvent.emit();
         this.router.navigate(['admin','rooms'],{queryParams:{id:next.id,action:'view'}})
       },
       error => this.message = 'Something went wrong. You may wish to try again.'
       );
   }

  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }
}
