import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {path:'signup', component: SignupComponent, pathMatch:'full'},
  {path:'login', component: LoginComponent, pathMatch:'full'},
  {path:'home', component: HomeComponent, pathMatch:'full'},
  {path:'editprofile', component: EditprofileComponent, pathMatch:'full'},
  {path:'', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
