import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  [x: string]: any;

  @Input()
  isLoggedIn: boolean = false;

  constructor(
    private loginService: LoginService,     
    private router: Router
    ) { }

   loginStatus$ : Observable<boolean> | undefined;
  user = null;

  ngOnInit(): void {
    //this.loginStatus$ = this.loginService.loggedIn
    console.log('nav-bar-compo.ts->');
    console.log(this.isLoggedIn );
    this.user = this.loginService.getUser();
    
  }

  public logout(){
      this.loginService.logout();
  }

}
