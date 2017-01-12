import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var _ = require('lodash');
@Component({
  selector: 'list-delete',
  templateUrl: './list-delete.component.html',
  styleUrls: ['./list-delete.component.css']
})
export class ListDeleteComponent implements OnInit {
  cnp: string;
  b: any[] = [];
  sters: any[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.cnp = params['id']);
    this.b = JSON.parse(localStorage.getItem('vector'))
   
    // 
  }

}

