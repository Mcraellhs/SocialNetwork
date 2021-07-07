import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from './_models/chat';
import { Post } from './_models/post';
import { User } from './_models/user';


const httpOptions={
  headers:new HttpHeaders(
    {
      'Authorization':'Bearer '+localStorage.getItem('token')
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl="https://localhost:5001/users/";
  postUrl="https://localhost:5001/posts/";
  chatUrl="https://localhost:5001/chats";
  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
return this.http.get<User[]>(this.baseUrl,httpOptions)
  }

  getUser(id:any):Observable<User>{
    return this.http.get<User>(this.baseUrl+id,httpOptions)
  }

  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.postUrl,httpOptions);
  }

  addPost(model:any){
   return this.http.post(this.postUrl,model, httpOptions);
  }

  getChats():Observable<Chat[]>{
    return this.http.get<Chat[]>(this.chatUrl,httpOptions);
  }

  addChat(model:any){
    return this.http.post(this.chatUrl,model,httpOptions);
  }

  updateUser(id:number,user:User){
    return this.http.put(this.baseUrl+id,user,httpOptions);


  }

  deletePost(id:number){
    return this.http.delete(this.postUrl+id,httpOptions);
  }

}
