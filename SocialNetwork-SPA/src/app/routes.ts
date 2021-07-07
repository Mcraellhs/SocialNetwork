import { Routes } from "@angular/router";
import { ChatComponent } from "./chat/chat.component";
import { HomeComponent } from "./home/home.component";
import { PostsComponent } from "./posts/posts.component";
import { UserEditResolver } from "./resolvers/user-edit.resolver";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserListComponent } from "./user-list/user-list.component";
import { AuthGuard } from "./_guards/auth.guard";
import { PreventUnSaved } from "./_guards/prevent-unsaved.guard";

export const appRoutes:Routes=[

    {path:'home',component:HomeComponent},
    {path:'users', component:UserListComponent,canActivate:[AuthGuard]},
    {path:'posts',component:PostsComponent,canActivate:[AuthGuard]},
    {path:'chat',component:ChatComponent,canActivate:[AuthGuard]},
    {path:'user/edit',component:UserEditComponent,canActivate:[AuthGuard], 
    resolve:{user:UserEditResolver},canDeactivate:[PreventUnSaved]},


    {path:'**',redirectTo:'home',pathMatch:'full'},


];
