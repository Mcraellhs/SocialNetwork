import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { PostsComponent } from './posts/posts.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { ChatComponent } from './chat/chat.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditResolver } from './resolvers/user-edit.resolver';
import { PreventUnSaved } from './_guards/prevent-unsaved.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    UserListComponent,
    PostsComponent,
    ChatComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes)
    
   // NgModule
  ],
  providers: [AuthService, UserEditResolver,PreventUnSaved],
  bootstrap: [AppComponent]
})
export class AppModule { }
