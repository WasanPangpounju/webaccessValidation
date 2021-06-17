import {Injectable, Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

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

  getBothValues(v1: any): void {
    console.log(this.selectedCase.id);
    alert(JSON.stringify(this.selectedCase.id) );
    this.caseTest = this.testCase.find(o => o.TestcaseID === this.selectedCase.id)
  }  

usertest = '';
email = '';
phone = '';
org = '';
optionMenu = '';

testCased: any;

  constructor( private formBuilder: FormBuilder , private router: Router, public httpClient: HttpClient ) {
//    this.tCase = this.getOrders()
//    this.caseTest = this.testCase[0];
  
//this.usertest = localStorage.getItem('name') + ' ' + localStorage.getItem('lastname');   
  }

  ngOnInit(): void {
this.optionMenu = 'test';
this.usertest = localStorage.getItem('name') + ' ' + localStorage.getItem('lastname');   
this.email = localStorage.getItem('email');
this.phone = localStorage.getItem('phone');
this.org = localStorage.getItem('org');

this.httpClient.get('http://localhost:8000/api/testcases/').subscribe( async (res)  => {
this.testCased = await res;
this.tCase = await this.getOrders()
this.caseTest = await this.testCased[0];

  });


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
  for( let item of this.testCased){
    await tList.push({id: item.TestcaseID , name: item.Purpose})
  }
  return await tList;
 }

onSubmit(){
  alert('test');
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

}