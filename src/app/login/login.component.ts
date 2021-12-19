import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  message = '';
  name: string;
  password: string;
  subscription : Subscription;

  constructor(private authService : AuthService,
              private router : Router,
              private activatedRouter : ActivatedRoute) { }



  ngOnInit(): void {
  this.subscription = this.authService.authenticationResultEvent.subscribe(
    result=>{
      if(result){
        //navigation
        const url = this.activatedRouter.snapshot.queryParams['requestedUrl'];
        this.router.navigateByUrl(url);
      }else{
        this.message = 'your username or password was not recognized - try again'
      }
    }
  );
  }
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  onSubmit() {

    this.authService.authenticate(this.name,this.password)
  }
}
