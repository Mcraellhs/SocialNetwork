import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../alertify.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../_models/user';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from '../_models/photo';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @ViewChild('userEditForm') userEditForm:NgForm;
  user:User;
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event:any){
    if(this.userEditForm.dirty){
      $event.returnValue=true
    }
  }
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean=false;
  photos:Photo[];
  
  
 
  constructor(private route:ActivatedRoute, private alertify:AlertifyService,
    private authService:AuthService, private userService:UserService) { }

  ngOnInit(): void {

    this.route.data.subscribe(data=>{
      this.user=data['user'];
     // console.log(this.user)
     this.initializeUploader();
     
    })
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  updateUser(){
   this.userService.updateUser(this.authService.decodedToken.nameid,this.user).subscribe(next=>{
    this.userEditForm.reset(this.user);
    this.alertify.success("User updated successfully");
   },error=>{
     this.alertify.error("Failed to update");
   })
    

  }

  initializeUploader(){
    this.uploader=new FileUploader({
      url:"https://localhost:5001/users/"+this.authService.decodedToken.nameid+"/photos",
      authToken:'Bearer '+localStorage.getItem('token'),
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024
    })
    this.uploader.onAfterAddingFile=(file)=>{file.withCredentials=false}
    /*  this.uploader.onSuccessItem=(item,response, status, headers)=>{
      if(response){
        let res:Photo = JSON.parse(response);
       
        const photo={
          id:res.id,
          photoUrl:res.photoUrl,
          publicId:res.publicId,
          isMain:res.isMain
          

        }
      this.photos.push(photo) 
      }
    }  */
   
  }

  setMainPhoto(photoId){
    this.userService.setMainPhoto(photoId).subscribe(()=>{
      this.alertify.success("Photo set as main");
      
      window.location.reload();

    },error=>{
      this.alertify.error("Failed to set to main");
      console.log(this.authService.decodedToken.nameid)
      
    })
  }

  deletePhotoFromUser(id:number){
    this.userService.deleteUserPhoto(id).subscribe(()=>{
      this.alertify.success("Photo deleted successfully");
      
    },error=>{
      this.alertify.error("Failed to delete photo");
    })
  }

  

}
