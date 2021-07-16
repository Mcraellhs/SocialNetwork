import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AlertifyService } from '../alertify.service';
import { UserService } from '../user.service';
import { User } from '../_models/user';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
user:User;
galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService:UserService,private alertify:AlertifyService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.user=data['user'];
    })


    //this.loadUser();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 80,

        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false

      },
    ];

    this.galleryImages=this.getImages();



  }

  /* loadUser(){
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user:User)=>{
      this.user=user;
    console.log(this.user);
    if(this.getImages()!=undefined){
      this.galleryImages=this.getImages();

    }
    console.log(this.galleryImages)

    },error=>{
      this.alertify.error(error);
    })
  } */

  getImages(){
    const imageUrls:any=[];
    for (const photo of this.user.profilePicture) {
      imageUrls.push({
        small:photo.photoUrl,
        medium:photo.photoUrl,
        big:photo.photoUrl
      })
     
    }

    return imageUrls
  }

}
