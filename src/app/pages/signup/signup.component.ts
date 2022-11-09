import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn }
  from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public showPassword: boolean = false;
  emailTest: any;
  toastr: any;
  isLoggedIn = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  public user = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    mobile: ''
  }

  ngOnInit(): void {
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  validateEmail(email:string) {
    if(email!=''){
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      console.log(re.test(String(email).toLowerCase()))
      this.emailTest = re.test(String(email).toLowerCase())
      if (this.emailTest != true) {
        //this.toastr.warning("please enter valid email")
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Invalid Email'
        })
        return;
      }
    }
  }


  formSubmit() {

    //alert('submit called');
    console.log(this.user);
    if (this.user.firstName == "" || this.user.firstName == null) {
      this.snackBar.open('FirstName Required!', 'ok', {
        duration: 3000
      });
      //alert('first name is required!');
      return;
    }
    else if (this.user.lastName == "" || this.user.lastName == null) {
      this.snackBar.open('LastName Required!', 'ok', {
        duration: 3000
      });
      //alert('last name is required!');
      return;
    }
    else if (this.user.username.trim() == "" || this.user.username == null) {
      
      this.snackBar.open('Email Required!', 'ok', {
        duration: 3000
      });
      //alert('email is required!');
      return;
    }
    else if (this.user.password.trim() == "" || this.user.password == null) {
      this.snackBar.open('Password Required!', 'ok', {
        duration: 3000
      });
      //alert('password is required!');
      return;
    }
    else if (this.user.mobile.trim() == "" || this.user.mobile == null) {
      this.snackBar.open('Mobile Required!', 'ok', {
        duration: 3000
      });
      //alert('mobile is required!');
      return;
    }
    else {

      this.validateEmail(this.user.username)

      //Check Here before submit the form whetere the user is alreay registerd or not!!!!



      //add user service
      this.userService.addUser(this.user).subscribe(
        (data) => {
          //success
          console.log(data);

          //alert('success');
          Swal.fire({
            icon: 'success',
            title: 'User Registered Successfully!',
            showConfirmButton: false,
            timer: 2000,
          })

          //reset form on success
          this.user = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            mobile: ''
          }

          this.router.navigate(['login'], { queryParams: { registered: 'true' } });


        },
        (error) => {
          console.log(error);
          //alert('something went wrong');
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'User Already Registered'
          })
        }

      );
    }

  }

}