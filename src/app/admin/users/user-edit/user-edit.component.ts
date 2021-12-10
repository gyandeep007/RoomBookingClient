import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/User';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  user:User;


  formUser:User;

  password:string;

  password2:string;

  nameIsValid = false;


  message:String='';

  constructor(private dataService:DataService,
              private router:Router) { }

  ngOnInit(): void {
    this.formUser = Object.assign({},this.user);
    this.isNameValid();
  }

  onSubmit(){
    if(this.formUser.id==null){
      this.dataService.addUser(this.formUser,this.password).subscribe(
        (user)=>{
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        }
      );
    }else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => {
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        }
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


}
