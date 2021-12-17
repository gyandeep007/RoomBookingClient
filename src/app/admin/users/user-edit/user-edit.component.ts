import {Component, Input, OnDestroy, OnInit, EventEmitter, Output} from '@angular/core';
import {User} from '../../../model/User';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';
import {FormResetService} from '../../../form-reset.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit,OnDestroy {

  @Input()
  user:User;


  @Output()
  dataChangedEvent = new EventEmitter();

  formUser:User;

  password:string;

  password2:string;

  nameIsValid = false;

  samePassword = false;


  message:String='';

  userResetSubscription : Subscription;

  constructor(private dataService:DataService,
              private router:Router,
              private formResetService : FormResetService) { }



  ngOnInit(): void {
         this.initializeForm();
        this.userResetSubscription = this.formResetService.resetUserEvent.subscribe(
          user=>{
            this.user = user;
            this.initializeForm();
          }
        );

  }

  ngOnDestroy(): void {
   this.userResetSubscription.unsubscribe();
  }


  initializeForm(){
    this.formUser = Object.assign({},this.user);
    this.isNameValid();

  }

  onSubmit(){
    if(this.formUser.id==null){
      this.dataService.addUser(this.formUser,this.password).subscribe(
        (user)=>{
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        }
      );
    }else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        },
        error => this.message='something went wrong and the data wasn\'t saved. you may want to try again.'
      );
    }
  }


   isNameValid(){
    if(this.formUser.name) {
      this.nameIsValid = this.formUser.name.trim().length > 0;
    }else{
      this.nameIsValid = false;
    }
   }

   isPasswordSame(){
    this.samePassword = this.password === this.password2;
   }


}
