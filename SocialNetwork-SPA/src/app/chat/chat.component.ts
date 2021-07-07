import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../alertify.service';
import { UserService } from '../user.service';
import { Chat } from '../_models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 chats:Chat[]=[];
 model:any={};
 jwtHelper = new JwtHelperService();
 in="in";
 out="out";
 decodedToken:any;
 

  constructor(private userService:UserService,private alertify:AlertifyService) { }

  ngOnInit(): void {
    const token:any = localStorage.getItem('token');
     this.decodedToken=this.jwtHelper.decodeToken(token).unique_name;
    this.loadChats();
  }

  loadChats(){
this.userService.getChats().subscribe((chats:Chat[])=>{
  this.chats=chats;
  

},error=>{
this.alertify.error(error);
})
  }

  sendMessage(){
    const token:any = localStorage.getItem('token');
    let decodedToken=this.jwtHelper.decodeToken(token);
 
   let tokId:number=decodedToken.nameid;
  

   this.model.userId=Number(tokId);
   //console.log(this.model)
      this.userService.addChat(this.model).subscribe(()=>{
    
      this.ngOnInit();
     
   },error=>{
     this.alertify.error("Failed to send message");
   }) 
  }

  

}
