import { Component, OnInit } from '@angular/core';
var _ = require('lodash');
@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    date: string[];
    b: string[];
    key: string = 'vector';
    constructor() { }

    ngOnInit() {
        this.date = JSON.parse(localStorage.getItem(this.key));
    }
    link(cnp: string): string {
        return "/about/" + cnp;
    }
    delete(cnp: string): string {

        return "/list-delete/" + cnp;

    }

}
