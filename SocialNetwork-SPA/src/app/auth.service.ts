import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl="http://localhost:5000/auth/"
jwtHelper = new JwtHelperService();
decodedToken:any;


  constructor(private http:HttpClient) { }

  login(model:any){

   // this.http.post()

   return this.http.post(this.baseUrl+"login",model)
   .pipe(
     map((response:any)=>{
       const user=response;
       if(user){
         localStorage.setItem('token',user.data);
         this.decodedToken=this.jwtHelper.decodeToken(user.data);
         console.log(this.decodedToken);
       }
     })
   )
  }


  register(model:any){
return this.http.post(this.baseUrl+"register", model);
  }

  loggedIn(){
    const token:any = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }


}
