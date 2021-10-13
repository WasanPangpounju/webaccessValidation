import { identifierModuleUrl, templateJitUrl } from '@angular/compiler';

import {Injectable , Component, OnInit } from '@angular/core';

import { AuthService } from '../users/auth.service';
import { TokenStorageService } from '../users/token-storage.service';

import { Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  reg = false;
  Users: any = [];

  form: any = {
    email : null,
    password: null 
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
   roles: string[] = [];


   formregister: any = {
    fname: null,
  email: null,
  nPhone: null,
  phone: null,
  org: null,
  password: null,
  password1: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  //errorMessage = '';
userPassword = '';


  constructor(private authService: AuthService , private tokenStorage: TokenStorageService, private router: Router , public httpClient: HttpClient ) {
   }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.userPassword = password;

//alert(username);
//https://jsonplaceholder.typicode.com/users
this.httpClient.get('http://159.203.175.109:8005/api/users/'+ username).subscribe( async (res)  => {
  //  console.log(res);   
  //alert( JSON.stringify(res));
 
  this.Users = await res;
  await localStorage.setItem('usertype', this.Users[0].usertype);
  await localStorage.setItem('name', this.Users[0].name);
  await localStorage.setItem('lastname', this.Users[0].lastname);
  await localStorage.setItem('name', this.Users[0].name);
  await localStorage.setItem('email', this.Users[0].email);
  await localStorage.setItem('nPhone', this.Users[0].nPhone);
  await localStorage.setItem('phone', this.Users[0].phone);
  await localStorage.setItem('org', this.Users[0].org);
  await localStorage.setItem('tId', this.Users[0].id);


 
 let usertype = localStorage.getItem('usertype');

 if(usertype != null && username === this.Users[0].email && password === this.Users[0].password) {
 if(usertype === 'tester'){
   //localStorage.clear();
//   alert('tester ' + this.Users[0].name);
      this.router.navigateByUrl('/tester');
 } else if(usertype === 'member'){
   //localStorage.clear();
//   alert('member');
      this.router.navigateByUrl('/member');
 } else if(usertype === 'admin'){
   //localStorage.clear();
//   alert('admin');
   //   this.router.navigateByUrl('/admin');
 }
 }

} )

//  alert(this.Users[0].name);
//alert(JSON.stringify( this.authService.login(username, password)  ));

// if( this.Users[0].usertype === 'tester' && this.Users[0].password === this.userPassword){
//   this.router.navigateByUrl('/tester');
// }else if( this.Users[0].usertype === 'admin' && this.Users[0].password === this.userPassword ){
//   this.router.navigateByUrl('/admin');
// } else if( this.Users[0].usertype === 'member' && this.Users[0].password === this.userPassword ){
//   this.router.navigateByUrl('/member');
// }


// this.authService.login(username,password).subscribe(
// data => {
//      alert(data);
//      alert('1');
//   },
//   err => {
// alert(JSON.parse(err.error).message);
//   }

// );

//      this.authService.login(username, password).subscribe(
//        data => {
//         this.tokenStorage.saveToken(data.accessToken);
//         this.tokenStorage.saveUser(data);
// alert(data.accessToken);
//         this.isLoginFailed = false;
//         this.isLoggedIn = true;
//         this.roles = this.tokenStorage.getUser().roles;
//         this.reloadPage();
//       },
//       err => {
//         this.errorMessage = err.error.message;
//         alert(this.errorMessage);
//         this.isLoginFailed = true;
//       }
//      );

  }
  

  reloadPage(): void {

    window.location.reload();
  }

onRegister(): void {
  const { fname, email, nPhone, phone , org, password , password1} = this.formregister;
alert(fname+ email+ nPhone+ phone + org + password + password1);

  // this.authService.register(fname, email, nPhone, phone , org, password , password1).subscribe(
  //   data => {
  //     console.log(data);
  //     this.isSuccessful = true;
  //     this.isSignUpFailed = false;
  //   },
  //   err => {
  //     this.errorMessage = err.error.message;
  //     this.isSignUpFailed = true;
  //   }
  // );

}  

onSelectState(s: string){
  if(s == 'register'){
    this.reg = true;
  }
  else {
    this.reg = false;
  }

}

}
