import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../alertify.service';
import { UserService } from '../user.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

   users:User[]=[];
   defaultPhoto="https://res.cloudinary.com/theviciousasp/image/upload/v1626458763/defaultuser_kc3obe.jpg";
  constructor(private userService:UserService,private alertify:AlertifyService, private route:ActivatedRoute) { }

  ngOnInit(): void {
this.route.data.subscribe(data=>{
  this.users=data['users'];
  
})

 //   this.loadUsers()
  }

  /* loadUsers(){
    this.userService.getUsers().subscribe((users:User[])=>{
this.users=users;
    },error=>{
      this.alertify.error(error);
    })
  } */

}
