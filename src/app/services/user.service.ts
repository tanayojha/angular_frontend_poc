import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
