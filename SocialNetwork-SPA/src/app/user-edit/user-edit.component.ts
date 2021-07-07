import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../alertify.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @ViewChild('userEditForm') userEditForm:NgForm;
  user:User;
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event:any){
    if(this.userEditForm.dirty){
      $event.returnValue=true
    }
  }

  constructor(private route:ActivatedRoute, private alertify:AlertifyService,
    private authService:AuthService, private userService:UserService) { }

  ngOnInit(): void {

    this.route.data.subscribe(data=>{
      this.user=data['user'];
     // console.log(this.user)
    })
  }

  updateUser(){
   this.userService.updateUser(this.authService.decodedToken.nameid,this.user).subscribe(next=>{
    this.userEditForm.reset(this.user);
    this.alertify.success("User updated successfully");
   },error=>{
     this.alertify.error("Failed to update");
   })
    

  }

}
