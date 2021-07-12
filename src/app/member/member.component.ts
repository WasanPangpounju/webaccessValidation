import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { from } from 'rxjs';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  usertest = '';
  email = '';
  phone = '';
  org = '';
  optionMenu = '';
  
  testResult: any;
url = '203.185.137.194`aol';

  constructor(public httpClient: HttpClient ) { }

  ngOnInit(): void {
    this.optionMenu = 'info';
this.usertest = localStorage.getItem('name') + ' ' + localStorage.getItem('lastname');   
this.email = localStorage.getItem('email');
this.phone = localStorage.getItem('phone');
this.org = localStorage.getItem('org');

  }


  onSelectState(s: string){
    if(s === 'info'){
      this.optionMenu = 'info';
    }  else if(s === 'report'){
      this.optionMenu = 'report';

      alert(this.url);
      this.httpClient.get('http://localhost:8000/api/testresult/'+ this.url ).subscribe( async (res)  => {
        var testresult = await res;
       alert(testresult);
      
      }); 
      
//       this.httpClient.get('http://localhost:8000/api/testresult/' + this.url).subscribe( async (res)  => {
//   //  console.log(res);   
// alert( JSON.stringify(res));
      
//    //this.testResult = await res;
//    //await localStorage.setItem('url', this.testResult[0].url);
   
//   // await localStorage.setItem('name', this.Users[0].name);
//   // await localStorage.setItem('lastname', this.Users[0].lastname);
//   // await localStorage.setItem('name', this.Users[0].name);
//   // await localStorage.setItem('email', this.Users[0].email);
//   // await localStorage.setItem('nPhone', this.Users[0].nPhone);
//   // await localStorage.setItem('phone', this.Users[0].phone);
//   // await localStorage.setItem('org', this.Users[0].org);
 
// // let usertype = localStorage.getItem('usertype');


// } )

    } else if( s === 'total'){
      this.optionMenu = 'total';
    } else if(s === 'setting') {
      this.optionMenu = 'setting';
    }else {
      this.optionMenu = 'info';
    }
   }
   
   
}
