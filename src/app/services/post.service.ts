import { Inject, Injectable } from '@angular/core';
import baseURL from './helper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../model/post';
import { AuthInterceptor } from './auth.interceptor';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from '../model/user';
import { LoginService } from './login.service';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpclient : HttpClient,private loginService : LoginService,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }
  
   user :any ;
   post :any ;
   author_id : number = 0;
   user_id : number =0;
   post_id : number =0;
   message : string = ''; 

  //POST Api Create Post
  public addPost( post: Post){
   this.user= this.loginService.getUser();
   this.user_id=this.user.id;
   console.log("User Id",this.user_id);
    //console.log("inisde addpost chekcing token"+this.storage.get('token'));
    //const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.storage.get('token') })
    return this.httpclient.post(`${baseURL}/post/addpost/${this.user_id}`,post);
  }

  //POST Api of get Post of a User.
  public getPostOfUser(post: Post){
    this.author_id= post.id
    return this.httpclient.post(`${baseURL}/post/mypost`, post);
  }

  //GET Api of get Post of All Users.
  public getPostOfAllUsers(){
    return this.httpclient.get(`${baseURL}/post/getallposts`);
  }

  //POST Api of Add Comments into a Post.
  public addComments(post_id:number, comment : string){
    return this.httpclient.post(`${baseURL}/post/addcomment/${post_id}`, comment);
  }

  //POST Api of increase count on a post by a Specific User
  public likeCount(post_id:number){
    return this.httpclient.post(`${baseURL}/post/likepost/${post_id}`, post_id);
  }

  //POST Api of decrease count on a post by a Specific User
  public unlikeCount(post_id:number){
    return this.httpclient.post(`${baseURL}/post/unlikepost/${post_id}`, post_id);
  }

  //POST Api of like post of a specific user
  public likepost(post_id: number){
    return this.httpclient.post(`${baseURL}/post/likepost/${post_id}`,post_id);
  }

  //POST Api of unlike post of a specific user
  public unlikepost(post_id:number){
    return this.httpclient.post(`${baseURL}/post/unlikepost/${post_id}`,post_id);
  }

  //GET Api of Comments posted into a Post By a Specific User
  public getPostComments(post_id:number){
    return this.httpclient.post(`${baseURL}/post/getpostcomments/${post_id}`, post_id);
  }

  //DELETE Api of Post of a Specific user
  public deletePost(post_id:number){
    return this.httpclient.delete(`${baseURL}/post/deletepost/${post_id}`);
  }

  

  

  

}