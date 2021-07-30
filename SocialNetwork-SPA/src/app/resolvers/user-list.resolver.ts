import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertifyService } from "../alertify.service";
import { UserService } from "../user.service";
import { User } from "../_models/user";

@Injectable()

export class UserListResolver implements Resolve<User[]>{

    
    constructor(private userService:UserService,private alertify:AlertifyService,
         private router:Router){ }
    resolve(route: ActivatedRouteSnapshot):  Observable<User[]>  {
      return this.userService.getUsers()
       .pipe(
          catchError(error=>{
              this.alertify.error("Failed to load data");
             // window.location.reload();
              this.router.navigate(["/home"]);
              return of(null);
          })
      ) 
    }
         

}