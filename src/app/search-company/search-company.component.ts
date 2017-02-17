import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
@Component({
  selector: 'search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.css']
})
export class SearchCompanyComponent implements OnInit {
  myform: FormGroup;
  cui: AbstractControl;
  url: string = "http://localhost:4000/firme";
  constructor(private fb: FormBuilder, private router: Router, private http: Http) { }

  ngOnInit() {
    this.myform = this.fb.group({ 'cui': '' });
    this.cui = this.myform.controls['cui'];
    this.http.get(this.url + '/store').subscribe((res: Response) => {
      console.log(res.statusText);
    })
  }
  search() {
    this.router.navigate(['./companies/' + this.cui.value]);
  }
}
