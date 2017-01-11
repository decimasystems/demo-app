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
    for (var i = 0; i < this.b.length; i++) {
      if (this.b[i].cnp == this.cnp)
        this.b[i] = this.b[i + 1];
    }
    // this.sters=_.remove(this.b,function(cnp){return this.b.cnp==this.cnp;})
  }

}

