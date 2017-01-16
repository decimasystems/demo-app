import { Component } from '@angular/core';
import { Numeral } from 'numbertowords/numeral.js';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent{
  message: string;
  nr: AbstractControl;
  myForm: FormGroup;
  separator: AbstractControl;
  decdivider: AbstractControl; 
  orderdivider: AbstractControl;
  currency: AbstractControl;

  constructor(fb: FormBuilder) {
    this.message = '';
    this.myForm = fb.group({
      'nr': ['', Validators.required],
      'currency': ['RON', Validators.required],
      'separator': [true, Validators.required],
      'decdivider': [',', Validators.required],
      'orderdivider': ['.', Validators.required]
    });

    this.nr = this.myForm.controls['nr'];
    this.currency = this.myForm.controls['currency'];
    this.separator = this.myForm.controls['separator'];
    this.orderdivider = this.myForm.controls['orderdivider'];
    this.decdivider = this.myForm.controls['decdivider'];
    this.nr.valueChanges.subscribe(
      (value: string) => {
        this.showmessage();
      });

    this.currency.valueChanges.subscribe(
      (cvalue: string) => {
        this.showmessage();
      });

    this.separator.valueChanges.subscribe(
      (svalue: string) => {
        this.showmessage();
      });

    this.decdivider.valueChanges.subscribe(
      (decvalue: string) => {
        this.showmessage();
      });

    this.orderdivider.valueChanges.subscribe(
      (ordervalue: string) => {
        this.showmessage();
      });
  }

  showmessage() {
    var space = this.separator.value ? ' ' : '';
    var cvalue = this.currency.value;
    var decvalue = this.decdivider.value;
    var ordervalue = this.orderdivider.value;
    var numeral = new Numeral(this.nr.value);
    if (cvalue == 'RON') {
      this.message = numeral.convertMoney('leu', 'lei', 'ban', 'bani', decvalue, ordervalue, space);
    } else if (cvalue == 'EUR') {
      this.message = numeral.convertMoney('euro', 'euro', 'eurocent', 'eurocenti', decvalue, ordervalue, space);
    } else if (cvalue == 'USD') {
      this.message = numeral.convertMoney('dolar', 'dolari', 'cent', 'centi', decvalue, ordervalue, space);
    } else if (cvalue == 'GBP') {
      this.message = numeral.convertMoney('lira', 'lire', 'cent', 'centi', decvalue, ordervalue, space);
    }

  }
}


