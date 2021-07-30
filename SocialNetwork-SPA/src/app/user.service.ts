import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Chat } from './_models/chat';
import { Post } from './_models/post';
import { User } from './_models/user';


/* const httpOptions={
  headers:new HttpHeaders(
    {
      'Authorization':'Bearer '+localStorage.getItem('token')
    }
  )
}; */

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl="https://localhost:5001/users/";
  postUrl="https://localhost:5001/posts/";
  chatUrl="https://localhost:5001/chats";
  constructor(private http:HttpClient, private authService:AuthService) { }

  getUsers():Observable<User[]>{
return this.http.get<User[]>(this.baseUrl)
  }

  getUser(id:any):Observable<User>{
    return this.http.get<User>(this.baseUrl+id)
  }

  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.postUrl);
  }

  addPost(model:any){
   return this.http.post(this.postUrl,model);
  }

  getChats():Observable<Chat[]>{
    return this.http.get<Chat[]>(this.chatUrl);
  }

  addChat(model:any){
    return this.http.post(this.chatUrl,model);
  }

  updateUser(id:number,user:User){
    return this.http.put(this.baseUrl+id,user);


  }

  deletePost(id:number){
    return this.http.delete(this.postUrl+id);
  }
  setMainPhoto(id:number){
    return this.http.post("https://localhost:5001/users/"+Number(this.authService.decodedToken.nameid)+"/photos/"+id+"/setMain",{});
  }

  deleteUserPhoto(id:number){

    return this.http.delete("https://localhost:5001/users/"+this.authService.decodedToken.nameid+"/photos/"+id);
  }
 

}
