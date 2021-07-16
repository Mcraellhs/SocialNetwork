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
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserDetailResolver } from './resolvers/user-detail.resolver';
import { UserListResolver } from './resolvers/user-list.resolver';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    UserListComponent,
    PostsComponent,
    ChatComponent,
    UserEditComponent,
    UserDetailComponent,
    PhotoEditorComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxGalleryModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    
   // NgModule
  ],
  providers: [AuthService, UserEditResolver,PreventUnSaved,UserDetailResolver,UserListResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
