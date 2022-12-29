import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient : HttpClient) { }

  //signup api
  public addUser( user: any){
    return this.httpclient.post(`${baseURL}/user/signup`, user);
  }

  //get All user List api
  public getAllUserList(){
    return this.httpclient.get(`${baseURL}/user/getalluser`)
  }

  //update user Info api
  public updateUserInfo(id: number, user: any){
    return this.httpclient.put(`${baseURL}/user/updateuser/${id}`,user);
  }

  public follow(id: number){
    return this.httpclient.post(`${baseURL}/user/follow/${id}`,id);
  }

  public unfollow(id:number){
    return this.httpclient.post(`${baseURL}/user/unfollow/${id}`,id);
  }

  
}
