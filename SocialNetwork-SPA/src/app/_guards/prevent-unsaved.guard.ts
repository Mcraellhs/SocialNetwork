import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserEditComponent } from "../user-edit/user-edit.component";


@Injectable()

export class PreventUnSaved implements CanDeactivate<UserEditComponent>{


    canDeactivate(component: UserEditComponent) {
        
        if(component.userEditForm.dirty){
            return confirm("Are you sure you want to continue? Any unsaved changes will be lost.")
        }
     return true
    }


}