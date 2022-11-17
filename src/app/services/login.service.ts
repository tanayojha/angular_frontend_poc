import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import baseURL from './helper';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

  //get Current User which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseURL}/current-user`);
  }

  setJwtToken(token: string) {
    this.storage.set("token", token);
    console.log(token);
    
  }

  getJwtToken() {
    return this.storage.get("token");
    
  }

  //genrate token
  public genearteToken(loginData: any){
      return this.http.post(`${baseURL}/generate-token`,loginData);
  }

  //set token in local storgae for logged in user
  public loggedInUser(token: any){
    console.log("insided  loggedInUser",token);
    this.storage.set;
      //localStorage.setItem('token',token);
      console.log("insided  loggedInUser",localStorage.getItem('token'));

      return true;
  }

  //check user is Login in or not
  public isLoggedIn(){
      let geneartedToken = localStorage.getItem("token");
      console.log("insided  isloggedin",geneartedToken);
      
      if(geneartedToken==undefined || geneartedToken=='' || geneartedToken== null){
          return false;
      }else{
        return true;
      }
  }

  //logout : remove token from local storage
  public logout(){
      // localStorage.setItem('token',''); 
      localStorage.removeItem('user');
      return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem('token');
  }

  //set userDetails
  public setUser(user : string){
    console.log("inside setuser"+user);
    localStorage.setItem('user', user);
  }

  //get user
  public getUser(){
    let user = localStorage.getItem('user');
    if(user != null){
        return JSON.parse(user);
    }
    else{
      this.logout();
      return null;
    }
  }

  //get User Role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }


}