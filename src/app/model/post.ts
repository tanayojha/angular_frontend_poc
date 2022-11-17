import { User } from "./user";

export class Post {
   id:number=0;
   content :string = "";
   postPhoto: string = "";
   likeCount: number = 0;
   commentCount: number = 0;
   shareCount: number = 0;
   isTypeShare: boolean = true;
   dateCreated: Date = new Date();
   dateLastModified: Date = new Date();
   author:User=new User();
}
