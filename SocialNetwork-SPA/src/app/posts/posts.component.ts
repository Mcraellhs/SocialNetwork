import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../alertify.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Post } from '../_models/post';
import { User } from '../_models/user';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
posts:Post[]=[];
model:any={};
users:User[]=[];

defaultPhoto="https://res.cloudinary.com/theviciousasp/image/upload/v1626458763/defaultuser_kc3obe.jpg";





styleNONE="none";
styleBLOCK="block"


jwtHelper = new JwtHelperService();
decodedTOKEN=this.jwtHelper.decodeToken(localStorage.getItem('token') as any);
  constructor(private _UserService:UserService, private alertify:AlertifyService,
     private authService:AuthService) { 
     }

  ngOnInit(): void {
   
    this.loadPosts();
    
    this.loadUsers();
    

    
  
   // this.loadUserMainPhoto();
   
  }

  



  loadUsers(){
    this._UserService.getUsers().subscribe((users:User[])=>{
this.users=users;

/* for(let i=0;i<this.posts.length;i++){

  for(let j=0;j<users.length;j++){
    if(this.posts[i].username==users[j].username){
      this.posts[i].userPhotoUrl=users[j].mainPhotoUrl;
      continue;
    }
  }

} */





//console.log(users)
    },error=>{
      this.alertify.error(error);
    })
    
  }



  // this.authService.decodedToken.nameid as number;

  /* loadUserMainPhoto(){
    console.log("yes")

    for(let i=0;i<this.posts.length;i++){
      console.log("yes")

     if(this.users[i].username==this.posts[i].username){
       console.log("yes")
       this.userPost.push(this.users[i].mainPhotoUrl)
     }
    };
    console.log(this.userPost);
  } */

  loadPosts(){
    this._UserService.getPosts().subscribe((post:Post[])=>{
      this.posts=post;
    
      
      this.posts.reverse();
    },error=>{
      this.alertify.error(error);

    })
  }

  

  addPosts(){
    const token:any = localStorage.getItem('token');
     let decodedToken=this.jwtHelper.decodeToken(token);
  
    let tokId:number=decodedToken.nameid;
   

    this.model.userId=Number(tokId);
    //console.log(this.model)
       this._UserService.addPost(this.model).subscribe(()=>{
       this.alertify.success("Post successfully added");
       this.ngOnInit();
      
    },error=>{
      this.alertify.error("Failed to add post");
    })   
  }

  deletePost(index:any){
    
    this._UserService.deletePost(index).subscribe(()=>{
      this.alertify.success("Post successfully deleted");
      this.ngOnInit();
    },error=>{
      this.alertify.error("Failed to delete post");
    })
  }

}
