import { Routes } from "@angular/router";
import { ChatComponent } from "./chat/chat.component";
import { HomeComponent } from "./home/home.component";
import { PostsComponent } from "./posts/posts.component";
import { UserDetailResolver } from "./resolvers/user-detail.resolver";
import { UserEditResolver } from "./resolvers/user-edit.resolver";
import { UserListResolver } from "./resolvers/user-list.resolver";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserListComponent } from "./user-list/user-list.component";
import { AuthGuard } from "./_guards/auth.guard";
import { PreventUnSaved } from "./_guards/prevent-unsaved.guard";

export const appRoutes:Routes=[

    {path:'home',component:HomeComponent},
    {path:'users', component:UserListComponent,canActivate:[AuthGuard],resolve:{users:UserListResolver}},
    {path:'users/:id', component:UserDetailComponent,canActivate:[AuthGuard],resolve:{user:UserDetailResolver}},
    {path:'posts',component:PostsComponent,canActivate:[AuthGuard]},
    {path:'chat',component:ChatComponent,canActivate:[AuthGuard]},
    {path:'user/edit',component:UserEditComponent,canActivate:[AuthGuard], 
    resolve:{user:UserEditResolver},canDeactivate:[PreventUnSaved]},


    {path:'**',redirectTo:'home',pathMatch:'full'},


];
