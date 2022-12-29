import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  infoMessage = '';
  isLoggedIn = false;


  constructor(
   
    private snackBar: MatSnackBar, 
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  
  public loginData = {
    username: '',
    password: '',
  };

  ngOnInit(): void {
    
  }

  public showPassword: boolean = false;


  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  formSubmit() {
    console.log("login button clicked");
    console.log(this.loginData);
    if (this.loginData.username.trim() == "" || this.loginData.username == null) {
      this.snackBar.open('Email Required!', 'ok', {
        duration: 3000
      });
      //alert('email is required!');
      return;
    }
    if (this.loginData.password.trim() == "" || this.loginData.password == null) {
      this.snackBar.open('Password Required!', 'ok', {
        duration: 3000
      });
      //alert('password is required!');
      return;
    }
    this.loginService.genearteToken(this.loginData).subscribe(
      (data: any)=> {
          console.log('Login sucess-->');
          console.log(data);
          //
          this.loginService.setJwtToken(data.token);
          //
          this.loginService.getCurrentUser().subscribe(
            (user : any) => {
              this.loginService.setUser(JSON.stringify({User : user} ));
              console.log(user);
              //localStorage.setItem("user_id",user.id);
            }
          );
           //alert('success');
          //  Swal.fire({
          //   icon: 'success',
          //   title: 'Login Successfully!',
          //   showConfirmButton: false,
          //   timer: 2000,
          // })
          this.snackBar.open('Password Required!', '', {
            duration: 1000
          });

        this.router.navigate(['/home'], { queryParams: { registered: 'true' } });

          
      },
      (error) => {
          console.log('Login Error-->');
          console.log(error);

          //alert('something went wrong');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Credentials'
          })
      }
    );
    
  }

}
