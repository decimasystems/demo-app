import { Component, OnInit } from '@angular/core';
var _ = require('lodash');
@Component({
  selector: 'inventarylist',
  templateUrl: './inventarylist.component.html',
  styleUrls: ['./inventarylist.component.css']
})
export class InventarylistComponent implements OnInit {
  inventary: string[] = [];
  inv: string[];
  key: string = 'inv';
  constructor() { }

  ngOnInit() {
    this.inventary = JSON.parse(localStorage.getItem(this.key));
  }

  updateObject(nr: string) {
    return '/inventaryobjects/' + nr;
  }

  deleteObject(nr: string) {

    var events = _.remove(this.inventary,
      i => {
        return i.nr == nr;
      });
    localStorage.setItem(this.key, JSON.stringify(this.inventary));
  }

}

