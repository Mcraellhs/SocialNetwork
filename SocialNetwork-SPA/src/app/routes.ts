import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PostsComponent } from "./posts/posts.component";
import { UserListComponent } from "./user-list/user-list.component";
import { AuthGuard } from "./_guards/auth.guard";

export const appRoutes:Routes=[

    {path:'home',component:HomeComponent},
    {path:'users', component:UserListComponent,canActivate:[AuthGuard]},
    {path:'posts',component:PostsComponent,canActivate:[AuthGuard]},
    {path:'**',redirectTo:'home',pathMatch:'full'},


];
