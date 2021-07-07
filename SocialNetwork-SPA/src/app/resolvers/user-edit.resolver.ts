import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertifyService } from "../alertify.service";
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";
import { User } from "../_models/user";


@Injectable()
export class UserEditResolver implements Resolve<User>{


    constructor(private router:Router,private userService:UserService,private authService:AuthService, private alertify:AlertifyService){}

    resolve(route: ActivatedRouteSnapshot):Observable<User> {
     

        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error=>{
                this.alertify.error("Problem retrieving data");
                this.router.navigate(['/users']);
                return of(null as any);
            })
        )
    }

}