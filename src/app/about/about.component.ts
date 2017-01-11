import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var _=require('lodash');
@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  cnp: string
  buletin: any[] = [];
  persoana:any[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.cnp = params['id']);
    this.buletin=JSON.parse(localStorage.getItem('vector'))
     this.persoana=_.find(this.buletin,{'cnp':this.cnp})
  }

}
