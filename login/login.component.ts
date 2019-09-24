import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
error: string = null;
  constructor(private auth: AuthService, private router: Router) { }

  login(form: NgForm){
    this.auth.login({...form.value, returnSecureToken: true})
    .subscribe(resData=>{
      console.log(resData);
      this.error = null;
      form.reset();
      this.auth.user.next(resData);
      this.router.navigateByUrl('/');
    }, err=>{
      console.log(err);
      this.error = err.error.error.message;
    })
  }
  ngOnInit() {
  }

}
