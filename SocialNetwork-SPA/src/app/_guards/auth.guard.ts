import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../alertify.service';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router,private alertify:AlertifyService){}
  canActivate(): boolean{

    if(this.authService.loggedIn()){
      return true;

    }

    this.alertify.error("You are not Logged In");
    this.router.navigate(['/home']);
    return false;

  }
  
}
