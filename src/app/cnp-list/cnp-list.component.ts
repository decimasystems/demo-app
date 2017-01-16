import { Component, OnInit } from '@angular/core';
var _ = require('lodash');
@Component({
    selector: 'list',
    templateUrl: './cnp-list.component.html',
    styleUrls: ['./cnp-list.component.css']
})
export class ListComponent implements OnInit {
    date: string[] = [];
    b:string[];
    key: string = 'vector';
    constructor() { }

    ngOnInit() {
        this.date = JSON.parse(localStorage.getItem(this.key));
    }
    link(cnp: string): string {
        return "/add/" + cnp;
    }
    delete(cnp:string) {
        this.b = _.remove(this.date, 
        x => { 

            return x.cnp==cnp;
})

        localStorage.setItem(this.key, JSON.stringify(this.date))

    }

}
