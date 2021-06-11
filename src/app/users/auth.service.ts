import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const AUTH_API = 'http://localhost:3000/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get(AUTH_API + ':' + username, { responseType: 'text' });

    // return this.http.post(AUTH_API + 'signin', {
    //   username,
    //   password
    // }, httpOptions);
  }

  register(fname : string, email : string, phonetype: string, phone: string, org: string, password: string, password1: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      fname , 
      email, 
      phonetype, 
      phone, 
      org, 
      password, 
      password1
    }, httpOptions);
  }

}


// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }
