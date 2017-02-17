import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http'
import * as _ from 'lodash';
@Component({
    selector: 'list',
    templateUrl: './cnp-list.component.html',
    styleUrls: ['./cnp-list.component.css']
})
export class ListComponent implements OnInit {
    date: string[] = [];
    url: string = 'http://localhost:4000/cards';
    constructor(private http: Http) { }

    ngOnInit() {
        this.http.get(this.url).subscribe(
            (res: Response) => {
                this.date = res.json();
            });
    }
    link(id: string): string {
        return "/cnp/" + id;
    }

    delete(cnp: string) {
        this.http.delete(this.url + '/' + cnp).subscribe((res: Response) => {
            this.http.get(this.url).subscribe((response: Response) => {
                this.date = response.json();
            });
        });


    }

}
