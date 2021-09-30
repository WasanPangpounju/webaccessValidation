import {Injectable, Component, OnInit } from '@angular/core';

import { ManagementService } from '../services/management.service';

import { HttpClient } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';

import {TokenStorageService} from '../users/token-storage.service';
import { Router } from '@angular/router';

import { of} from 'rxjs';

import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.css']
})
export class TesterComponent {
    
  form: any = {
    cm : null,
  };


caseTest: any;
  selectedCase: any;
  tCase: any;
  
result: any;

  getBothValues(v1: any): void {
    console.log(this.selectedCase.id);
//    alert(JSON.stringify(this.selectedCase.id) );
    localStorage.setItem('uTestcaseId', this.selectedCase.id);

    this.caseTest = this.testCased.find(o => o.TestcaseID === this.selectedCase.id)
  }  

usertest = '';
email = '';
phone = '';
org = '';
optionMenu = '';

job: any;
testCased: any;
caseRes: any;

url = '203.185.137.194/aol';

userComment = '';
qdata = false;

  constructor( private service: ManagementService , private formBuilder: FormBuilder , private router: Router, public httpClient: HttpClient ) {
    //    this.tCase = this.getOrders()
//    this.caseTest = this.testCase[0];
  
//this.usertest = localStorage.getItem('name') + ' ' + localStorage.getItem('lastname');   

this.optionMenu = 'loaddata';

this.service.getTestcase().subscribe( async res => {
  this.testCased = await res;
  //alert(this.testCased);
 this.qdata = await true;

});

//Query Testcase Data 
// this.httpClient.get('http://159.203.175.109:8005/api/testcases/').subscribe( async (res)  => {
// this.testCased = await res;
// this.qdata = await true;
//  });

 //end constructor
  }

  ngOnInit(): void {

//this.optionMenu = 'test';
this.url = localStorage.getItem('jobUrl'); 
this.usertest = localStorage.getItem('name') + ' ' + localStorage.getItem('lastname');   
this.email = localStorage.getItem('email');
this.phone = localStorage.getItem('phone');
this.org = localStorage.getItem('org');
this.caseRes = this.checkResult();

//get job by user ID

 
//query data - testcase result
try{
 
this.httpClient.get('http://localhost:8000/api/testresult/'+ this.url.replace('/', '`') ).subscribe( async (res)  => {
  var testresult = await res;
var result_list = [];
var tList = [];


for( var rt in testresult){
//  alert(testresult[rt].TestcaseID);
  await result_list.push({id: testresult[rt].TestcaseID});
  //alert(result_list);
}

var s = true;

for( let item of this.testCased){
  for(let t of result_list){
    if(item.TestcaseID.toString() == t.id ){
s = !s;
      break;
    }
s = true;
  }

  if(s === true){
    await tList.push({id: item.TestcaseID , name: item.Purpose})
}
//s = !s
              

}

 this.tCase = await tList;

 if(localStorage.getItem('uTestcaseId') ){
//  this.caseTest = await this.testCased[0];
//  alert(this.tCase[0].id);
  this.caseTest = this.testCased.find(o => o.TestcaseID === this.tCase[0].id)

}

this.optionMenu = await 'test';

});

 
}
catch (error) {
  alert(error.message);
}
// this.httpClient.get('http://localhost:8000/api/testcases/').subscribe( async (res)  => {
// this.testCased = await res;

// this.tCase = await this.getOrders()

// if(localStorage.getItem('uTestcaseId') ){
// //  this.caseTest = await this.testCased[0];
// //  alert(this.tCase[0].id);
//   this.caseTest = this.testCased.find(o => o.TestcaseID === this.tCase[0].id)

// }

//  });

  }

  testCase = [
    {
      TestcaseID: 1001,
      Purpose: 'ตรวจสอบการใส่ข้อความอธิบายรูปภาพโดยใช้ alt tag',
      Prerequisite: 'มีรูปภาพใด ๆ ปรากฏบนหน้าเว็บไซต์',
      TestData: '',
      TestSteps: 'ในโปรแกรม Internet Explorer วางเมาส์บนภาพแต่ละภาพ จะมีการแสดงข้อความ Alt ในรูปแบบของ tool tip',
      ExpectedResults: 'มีการใส่ข้อความอธิบายเกี่ยวกับรูปภาพที่แสดงภายในเว็บไซต์',
      Result: '(pass / fail)',
      Comments: 'การตรวจสอบ ในข้อนี้ จะต้องอาศัยการใช้งานซอฟต์แวร์อ่านจอภาพ (Screen Reader) ร่วมกับการใช้งานเว็บไซต์ โดยสามารถตรวจสอบจากการใช้ซอฟต์แวร์อ่านจอภาพอ่านข้อมูลภายในเว็บไซต์ ในตำแหน่งที่มีรูปภาพแสดงผลอยู่ หรือใช้วิธีตรวจสอบตามขั้นตอนการตรวจสอบ Test case ได้'
    },
    {
      TestcaseID: 1002,
      Purpose: 'ตรวจสอบลิงค์สำหรับ  Skip Navigation เพื่อทำให้เว็บไซต์สามารถเข้าถึงได้ง่ายจากคนพิการทางการเคลื่อนไหว',
      Prerequisite: 'เว็บไซต์ที่มีส่วนประกอบของเนื้อหา ประกอบด้วยลิงก์',
      TestData: '',
      TestSteps: 'ตรวจสอบโดยการกด Ctrl+Home เพื่อเลื่อน focuses ไปยังส่วนบนของหน้าเว็บไซต์ ใช้ tab เพื่อเริ่มต้นการเลื่อนตำแหน่งผ่านลิงก์ โดยตรวจสอบให้แน่ใจว่ามีลิงก์ Skip to Content อยู่บริเวณส่วนแรกของเว็บไซต์',
      ExpectedResults: 'ปรากฏลิงก์ Skip Navigation อยู่บริเวณส่วนแรกของเว็บไซต์',
      Result: '(pass / fail)',
      Comments: 'Skip Navigation อาจอยู่ในรูปแบบ link หรือปุ่มกด'
    },
    {
      TestcaseID: 1003,
      Purpose: 'ตรวจสอบข้อความกำกับเนื้อหาที่ไม่เป็นข้อความ',
      Prerequisite: 'เว็บไซต์ที่มีส่วนประกอบของเนื้อหา ประกอบด้วยปุ่มควบคุม หรือช่องป้อนข้อความ',
      TestData: '',
      TestSteps: 'ตรวจสอบโดยการพิจารณาข้อความกำกับปุ่มหรือช่องป้อนข้อความว่าสื่อถึงจุดประสงค์ที่ชัดเจนหรือไม่',
      ExpectedResults: 'ถ้าข้อความไม่สื่อถึงจุดประสงค์ที่ชัดเจน มีการใส่ข้อความอธิบายเพิ่มในแอทริบิวท์',
      Result: '(pass / fail)',
      Comments: ''
    }
  ]

async getOrders() {
  var tList = [];
var restemp = await this.caseRes;

var s = true;
  for( let item of this.testCased){
//        await tList.push({id: item.TestcaseID , name: item.Purpose})
        for(let t of restemp){
          if(item.TestcaseID.toString() == t.id ){
s = !s;
            break;
          }
    s = true;
        }

        if(s === true){
          await tList.push({id: item.TestcaseID , name: item.Purpose})
  }
  //s = !s
                    
  }

  return await tList;
 }

 onResult(r){
//this.result = r;
if(r === 'pass'){
  this.result = true;
} else {
  this.result = false;
}
//alert(this.result);
 }


onSubmit(){
  //alert('test'+ this.result);
//alert(Date());
let saveData =     {
  Url: this.url,
Usertest: this.usertest,
UserComment: this.userComment,
TestDate: Date(),
  TestcaseID: this.caseTest.TestcaseID ,
  Purpose: this.caseTest .Purpose ,
  Prerequisite: this.caseTest .Prerequisite,
  TestData: this.caseTest .TestData,
  TestSteps: this.caseTest .TestSteps,
  ExpectedResults: this.caseTest .ExpectedResults,
  Result: this.result,
  Comments: this.caseTest .Comments
};
//alert(saveData.Comments );
this.optionMenu = 'loaddata';

this.httpClient.post<any>('http://localhost:8000/api/result' , saveData ).subscribe( async data => {
//alert(JSON.stringify(data) );
this.optionMenu = await 'test';

   await window.location.reload();
});


//  this.router.navigateByUrl('/admin');
}

onSelectState(s: string){
 if(s === 'newJob'){
      this.optionMenu = 'newJob';
      
 }  else if(s === 'editJob'){
   this.optionMenu = 'editJob';
 } else if( s === 'totalJob'){
   this.optionMenu = 'totalJob';
 } else if(s === 'profile') {
   this.optionMenu = 'profile';
 }else {
   this.optionMenu = 'test';
 }
}

async checkResult() {
  var result_list = [];

  this.httpClient.get('http://localhost:8000/api/testresult/'+ this.url.replace('/', '`') ).subscribe( async (res)  => {
    var testresult = await res;
   //alert(JSON.stringify(testresult) );
//alert(testresult[1].TestcaseID);
for( var rt in testresult){
  //alert(testresult[rt].TestcaseID);
  await result_list.push({id: testresult[rt].TestcaseID});

  //alert(result_list);
}
}); 
  

//   this.httpClient.post<any>('http://localhost:8000/api/testcase_result' ,  { Url: this.url } ).subscribe(data => {
// //alert(JSON.stringify(data) );
// alert(data.length)
// });
// //await alert(JSON.stringify(result_list) );

return await result_list;
}

onUrl(jobUrl){
//  alert(jobUrl);
  localStorage.setItem('jobUrl', jobUrl);
  this.tCase = this.getOrders()

  window.location.reload();

}
}