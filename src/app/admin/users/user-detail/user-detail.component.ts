import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {User} from '../../../model/User';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  user:User;
  @Output()
  dataChangeEvent = new EventEmitter();
  message = '';
  constructor(private dataService:DataService,
              private router:Router) { }

  ngOnInit(): void {
  }

  editUser(){
   this.router.navigate(['admin','users'],{queryParams:{action:'edit',id:this.user.id}})
  }

  deleteUser() {
    this.message = 'deleting........'
    this.dataService.deleteUser(this.user.id).subscribe(
      next=>{
        this.dataChangeEvent.emit();
        this.router.navigate(['admin','users']);
      },
      error => this.message = 'unable to delete user'
    )
  }

  resetPassword() {
    this.message = 'resetting password........'
    this.dataService.resetUserPassword(this.user.id).subscribe(
      next=>{
        this.message = 'the password has been reset'
      },
        error => this.message = 'Unable to reset password'
    );
  }
}
