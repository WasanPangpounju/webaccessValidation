import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
//private url = 'http://localhost:8000/api/';
private url = 'http://159.203.175.109:8005/api/';

  constructor(private httpClient: HttpClient) { }

getTestcase(){
var testcase = this.httpClient.get(this.url + 'testcases/');
return testcase;
}

getJob(){

}
}
