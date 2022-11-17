import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { UserJob } from 'src/app/model/user-job';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post:Post = new Post();
  isLoggedIn = true;
  user : User =new User();
  userJob : UserJob =  new UserJob();
  userid : number = 0;
  firstName : string = "";
  lastName: String = "";
  content : string="";
  postList : Post[]=[];

  constructor(
    private loginService: LoginService, private postService: PostService
    ) {       
    }

  ngOnInit(): void {
     console.log('home-compo.ts->');
     console.log(this.isLoggedIn);
     this.firstName = JSON.parse(localStorage.getItem('user') || '{}').User.firstName;
     this.lastName = JSON.parse(localStorage.getItem('user') || '{}').User.lastName;
     this.getCurrentUserInfo();
      this.getPostOfAllUser();
    }

getCurrentUserInfo(){
  this.loginService.getCurrentUser().subscribe((data:any)=>{
    this.user=data;
    console.log("USer data",this.user);
  })
}

getPostOfUser(post : Post){
  this.postService.getPostOfUser(post).subscribe((data:any)=>{
    this.content=data;
    console.log("Post",this.content);
  })
}

getPostOfAllUser(){
  this.postService.getPostOfAllUsers().subscribe((data:any)=>{
    this.postList=data;
    console.log("Post",data);
  })
}



  addPost(pst:Post){
    //Get Api o fPost User
    this.getPostOfUser(pst);
  //  this.userid=JSON.parse(  localStorage.getItem('user') || '{}').user.id;
  console.error("inside home "+JSON.parse(localStorage.getItem('user') || '{}').User.username);
  console.error("inside home "+JSON.parse(localStorage.getItem('user') || '{}').User.id);
  console.error("POST content",pst.content);
  //console.log('firstName:' + this.postfg.value);
  this.userid = JSON.parse(localStorage.getItem('user') || '{}').User.id
    this.post.content=pst.content;
    this.post.postPhoto=this.post.postPhoto;
    this.post.id = this.userid; 
    this.postService.addPost(this.post).subscribe(res=>{
      console.error("response from add post"+res);
    });

    
    
  }



}