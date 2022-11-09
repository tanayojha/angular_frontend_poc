import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  [x: string]: any;

  @Input()
  isLoggedIn: boolean = false;
  user = null;

  constructor(
    private loginService: LoginService,     
    private router: Router
    ) { }

  ngOnInit(): void {
    //this.isLoggedIn = this.loginService.isLoggedIn();
    console.log('nav-bar-compo.ts->');
    console.log(this.isLoggedIn );
    this.user = this.loginService.getUser();
    //if()
  }

  public logout(){
      this.isLoggedIn = false;
      this.loginService.logout();
      console.log(this.isLoggedIn );

      this.router.navigate(['/login'], { queryParams: { registered: 'false' } });

  }

}
