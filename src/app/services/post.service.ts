import { Injectable } from '@angular/core';
import baseURL from './helper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../model/post';
import { AuthInterceptor } from './auth.interceptor';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpclient : HttpClient) { }
  author_id!:number;

  //Create Post api
  public addPost( post: Post){
    this.author_id= post.id
    console.log("inisde addpost chekcing token"+localStorage.getItem('token'));
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') })
    return this.httpclient.post(`${baseURL}/post/addpost/${this.author_id}`, post,{ headers });
  }

  //Get Post of User api
  public getPostOfUser(post: Post){
    this.author_id= post.id
    console.log("inisde get PostOf USer chekcing token"+localStorage.getItem('token'));
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') })
    return this.httpclient.post(`${baseURL}/post/mypost`, post,{ headers });
  }

  //Get Post of All Users Api
  public getPostOfAllUsers(){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') })
    return this.httpclient.post(`${baseURL}/post/get-all-posts`,{ headers });
  }



}
