import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn = true;
  user = null;

  constructor(private loginService: LoginService    
    ) { }

  ngOnInit(): void {
    //this.isLoggedIn = this.loginService.isLoggedIn();
    console.log('home-compo.ts->');
    console.log(this.isLoggedIn);
    if(this.isLoggedIn){
      window.location.reload;
    }
  }



}
