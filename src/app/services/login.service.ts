import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //get Current User which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseURL}/current-user`);
  }

  //genrate token
  public genearteToken(loginData: any){
      return this.http.post(`${baseURL}/generate-token`,loginData);
  }

  //set token in local storgae for logged in user
  public loggedInUser(token: any){
      localStorage.setItem('token',token);
      return true;
  }

  //check user is Login in or not
  public isLoggedIn(){
      let geneartedToken = localStorage.getItem("token");
      if(geneartedToken==undefined || geneartedToken=='' || geneartedToken== null){
          return false;
      }else{
        return true;
      }
  }

  //logout : remove token from local storage
  public logout(){
      localStorage.removeItem('token'); 
      localStorage.removeItem('user');
      return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem('token');
  }

  //set userDetails
  public setUser(user : any){
    localStorage.setItem('user', JSON.stringify(user));
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
