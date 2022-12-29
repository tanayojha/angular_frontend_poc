import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import baseURL from './helper';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string = '';

  constructor(private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

  //genrate token
  public genearteToken(loginData: any) {
    return this.http.post(`${baseURL}/generate-token`, loginData);
  }

  //Login API
  public getCurrentUser() {
    return this.http.get(`${baseURL}/current-user`);
  }

  //Set JWT Token
  public setJwtToken(token: string) {
    this.storage.set("token", token);
    console.log('setJwtToken()-> ', token);
    this.token = token;
  }

  //Get JWT Token
  public getJwtToken() {
    console.log('getJwtToken()-> ', this.token);
    return this.storage.get("token");
  }

  public loginUser(token: string) {
    localStorage.setItem("token", token);
    return true;
  }

  //isLogin: user is logged in or not
  public isLoggedIn() {

    let token = localStorage.getItem("token")
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

 //logout : remove token from local storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token
  public getToken() {
    console.log(localStorage.getItem('token'))
    return localStorage.getItem('token');
  }

  //set userDetails
  public setUser(user: string) {
    localStorage.setItem('user', user);
  }

  public getUser() {
    let usrStr = localStorage.getItem("user");
    console.log(usrStr + "user")
    if (usrStr != null) {
     console.log("GETUSER"+JSON.parse(usrStr|| '{}').User);
      return JSON.parse(usrStr|| '{}').User;
    }
    else {
      this.logout();
      return null;
    }
  }

  //get User Role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }


}