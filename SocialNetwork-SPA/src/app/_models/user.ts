import { Photo } from "./photo";
import { Post } from "./post";

export interface User {

    id:number;
    username:string;
    firstname:string;
    lastname:string;
    email:string;
    university:string;
    mainPhotoUrl:string;
    posts?:Post[];
    profilePicture:Photo[];

}
