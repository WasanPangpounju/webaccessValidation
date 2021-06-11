import { Component, OnInit } from '@angular/core';

import {NavigationExtras} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private location: Location ) { }

  ngOnInit(): void {
    
  }

  goBack(): void {
    this.location.back();
  }

}
