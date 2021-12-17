import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {DataService} from '../../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormResetService} from '../../form-reset.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:Array<User>;
  selectedUser:User;
  action:string;
  dataLoaded = false;
  loadingMessage='please wait data is loading';
  retryCount=0;
  constructor(private dataService:DataService,
              private route:ActivatedRoute,
              private router:Router,
              private formResetService : FormResetService) {
    console.log('constructor of User component')
  }

  loadingData(){
    this.dataService.getUsers().subscribe(
      (next)=> {
        this.users = next;
        this.dataLoaded = true;
        this.processUrlParams();
      },
      error => {
        this.retryCount++;
        if(this.retryCount <=5){
          this.loadingData();
        }
        this.loadingMessage = 'an error occurred please try again later';
      }
    );
  }

  processUrlParams(){
    this.route.queryParams.subscribe(
      (params)=>{
        const id = params['id'];
        this.action = params['action'];
        console.log(this.route);
        if(id){
          this.selectedUser = this.users.find(user=>user.id === +id);
        }
        if(this.action === 'add'){
          this.selectedUser = new User();
          this.formResetService.resetUserEvent.emit(this.selectedUser);
        }
      }
    );
  }

  ngOnInit(): void {
    console.log('ngOnInit of User component')
    this.loadingData();


  }

  setUser(id:number){
    this.router.navigate(['admin','users'],{queryParams:{id:id,action:'view'}});
  }

  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin','users'],{queryParams:{action:'add'}})
  }
}
