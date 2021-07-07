import { Post } from "./post";

export interface User {

    id:number;
    username:string;
    firstname:string;
    lastname:string;
    email:string;
    university:string;
    posts?:Post[];

}
