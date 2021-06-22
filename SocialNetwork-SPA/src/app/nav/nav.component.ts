import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../alertify.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model:any={}
  constructor(public authService:AuthService,private alertify:AlertifyService, private router:Router) { }

  ngOnInit(): void {
  }


  login(){
    this.authService.login(this.model).subscribe(data=>{
     // this.model=data;
     this.alertify.success("Successfully logged in");
     this.router.navigate(['/users']);
    },error=>{
      this.alertify.error("Failed to log in")
    })
  }

  loggedIn(){
   
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertify.warning("Logged Out")
    this.router.navigate(['/home']);

  }

}
