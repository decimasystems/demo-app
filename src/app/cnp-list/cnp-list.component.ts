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
    b: string[];
    url: string = 'http://localhost:4000/cards';
    constructor(private http: Http) { }

    ngOnInit() {
        this.http.get(this.url).subscribe(
            (res: Response) => {
                this.date = res.json();
            });
    }
    link(cnp: string): string {
        return "/add/" + cnp;
    }
    delete(cnp: string) {
       // this.b = _.remove(this.date,
        //    x => {
        //        return (x as any).cnp == cnp;
        //    })
     //   this.http.put(this.url, JSON.stringify(this.date)).subscribe((res: Response) => {
     //       this.date = res.json();
     //   });
     this.http.delete(this.url+'/'+cnp).subscribe((res:Response)=>{
        this.http.get(this.url).subscribe((response:Response)=>{
             this.date=response.json();
         });
     });
      

    }

}
