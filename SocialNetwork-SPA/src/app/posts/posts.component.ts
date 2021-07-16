import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../alertify.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Post } from '../_models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
posts:Post[]=[];
model:any={};


styleNONE="none";
styleBLOCK="block"


jwtHelper = new JwtHelperService();
decodedTOKEN=this.jwtHelper.decodeToken(localStorage.getItem('token') as any);
  constructor(private _service:UserService, private alertify:AlertifyService,
     private authService:AuthService) { 
     }

  ngOnInit(): void {
   
    this.loadPosts()

    

  }
  // this.authService.decodedToken.nameid as number;

  loadPosts(){
    this._service.getPosts().subscribe((post:Post[])=>{
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
       this._service.addPost(this.model).subscribe(()=>{
       this.alertify.success("Post successfully added");
       this.ngOnInit();
      
    },error=>{
      this.alertify.error("Failed to add post");
    })   
  }

  deletePost(index:any){
    
    this._service.deletePost(index).subscribe(()=>{
      this.alertify.success("Post successfully deleted");
      this.ngOnInit();
    },error=>{
      this.alertify.error("Failed to delete post");
    })
  }

}
