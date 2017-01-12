import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms'
var _ = require('lodash');
@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  myForm: FormGroup;
  cnp: AbstractControl;
  lastName: AbstractControl;
  firstName: AbstractControl;
  nationality: AbstractControl;
  series: AbstractControl;
  number: AbstractControl;
  birth: AbstractControl;
  adress: AbstractControl;
  valid1: AbstractControl;
  valid2: AbstractControl;
  issued: AbstractControl;

  cnpRoute: string
  buletin: any[] = [];
  persoana: any;
  date: any[] = [];
  b: any;
  key: string = 'vector';
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }
  buildForm() {
    this.myForm = this.fb.group({
      'series': [this.persoana.series, Validators.required],
      'number': [this.persoana.number, Validators.required],
      'cnp': [this.persoana.cnp, Validators.required],
      'lastName': [this.persoana.lastName, Validators.required],
      'firstName': [this.persoana.firstName, Validators.required],
      'nationality': [this.persoana.nationality, Validators.required],
      'birth': [this.persoana.birth, Validators.required],
      'adress': [this.persoana.adress, Validators.required],
      'issued': [this.persoana.issued, Validators.required],
      'valid1': [this.persoana.valid1, Validators.required],
      'valid2': [this.persoana.valid2, Validators.required]
    })
    this.series = this.myForm.controls['series'];

    this.number = this.myForm.controls['number'];

    this.lastName = this.myForm.controls['lastName'];

    this.firstName = this.myForm.controls['firstName'];

    this.nationality = this.myForm.controls['nationality'];

    this.cnp = this.myForm.controls['cnp'];

    this.adress = this.myForm.controls['adress'];

    this.birth = this.myForm.controls['birth'];

    this.valid1 = this.myForm.controls['valid1'];

    this.valid2 = this.myForm.controls['valid2'];

    this.issued = this.myForm.controls['issued'];
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cnpRoute = params['id']
      this.buletin = JSON.parse(localStorage.getItem(this.key))
      this.persoana = _.find(this.buletin, { 'cnp': this.cnpRoute })
      this.buildForm();
    });
  }

  update(cnp: string) {
    this.date = JSON.parse(localStorage.getItem(this.key))
    this.b = _.remove(this.date,
      x => {
        return x.cnp == cnp;
      })
    this.date.push(this.myForm.value)
    localStorage.setItem(this.key, JSON.stringify(this.date))
  }

}
