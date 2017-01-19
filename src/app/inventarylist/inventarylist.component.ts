import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

declare let pdfMake: any;

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
        return (i as any).nr == nr;
      });
    localStorage.setItem(this.key, JSON.stringify(this.inventary));
  }

  print() {
        var inventar={content:'Fisa de inventar'}
        pdfMake.createPdf(inventar).open();
    }

}

