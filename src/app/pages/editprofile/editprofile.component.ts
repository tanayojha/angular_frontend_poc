import { Component, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdatedUser } from 'src/app/model/updated-user';



@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})  
export class EditprofileComponent {
  [x: string]: any;
  hide = true;

  isLoggedIn = true;
  userid: number=0;
  firstName: string = "";
  lastName: String = "";
  userimg:string = '';
  username:string = '';
  followers:number = 0;
  following:number=0;
  user: User = new User();
  updateduser:UpdatedUser = new UpdatedUser();

  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService  ) {
  }

  ngOnInit(): void {
    //calling Get User Details API 
    this.getCurrentUserInfo();
    console.log(" Current user Id->  ",this.user);
    console.log('editprofile-compo.ts->');
    console.log(this.isLoggedIn);
    //this.firstName = JSON.parse(this.storage.get('user') || '{}').user.firstName;
    //this.lastName = JSON.parse(this.storage.get('user') || '{}').user.lastName;
  }

  

   //For user details
   getCurrentUserInfo() {
    this.loginService.getCurrentUser().subscribe((data: any) => {
      this.user = data;
      console.log("getCurrentUserInfo() -> USer data--> ", this.user);
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.userimg = this.user.profile;
      this.userid=this.user.id;
      
      console.log("getCurrentUserInfo() -> USer data--> ", this.user.id);
    })
  }

  //For user Update
  updateUserInfo(){
    console.log(this.user);
    this.updateduser.id = this.user.id;
    this.updateduser.firstName = this.user.firstName;
    this.updateduser.lastName = this.user.lastName;
    this.updateduser.mobile = this.user.mobile;
    this.updateduser.password = this.user.password;


    if (this.updateduser.firstName == "" || this.updateduser.firstName == null) {
      this.snackBar.open('FirstName Required!', 'ok', {
        duration: 3000
      });
      //alert('first name is required!');
      return;
    }
    else if (this.updateduser.lastName == "" || this.updateduser.lastName == null) {
      this.snackBar.open('LastName Required!', 'ok', {
        duration: 3000
      });
      //alert('last name is required!');
      return;
    }
    else if ( this.updateduser.mobile == null) {    //this.user.mobile.trim() == "" ||
      this.snackBar.open('Mobile Required!', 'ok', {
        duration: 3000
      });
      //alert('mobile is required!');
      return;
    }
    else{
      this.userService.updateUserInfo(this.updateduser.id,this.updateduser).subscribe((data:any)=>{
        this.user = data;
        console.log("updateUserInfo()-> ",this.user);
  
        //get updated user details & set
        this.getCurrentUserInfo()
      });
    }
    
  }

}
