import { Author } from "./author";
import { Post } from "./post";
import { User } from "./user";

export class Comment {
    id:number=0;
    content!:string;
    likeCount:number=0;
    dateCreated: Date = new Date();
    dateLastModified: Date = new Date();
    user:User = new User();
    author!:Author
    post:Post = new Post();
    likeList: any[] = [];
}

