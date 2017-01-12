import { Component } from '@angular/core';
import { CNP } from 'cnp.js/cnp.js';

import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms'

function inputTextValidator(control: FormControl): { [s: string]: boolean } {
  if (control.value.search(/[A-Za-z]/))
    return { invalidInput: true };
}
function inputNumberValidator(control: FormControl): { [s: string]: boolean } {
  if (control.value.search(/[0-9]/))
    return { validNumber: true };
}
function lengthValid2(control: FormControl): { [s: string]: boolean } {
  if (control.value.length != 2)
    return { validLength: true };
}
function lengthValid6(control: FormControl): { [s: string]: boolean } {
  if (control.value.length != 6)
    return { validLength6: true };
}
function cnpValid(control: FormControl): { [s: string]: boolean } {
  var cod = new CNP(control.value);
  if (!cod.isValid)
    return { codValid: true };

}


@Component({
  selector: 'cnp',
  templateUrl: './cnp.component.html',
  styleUrls: ['./cnp.component.css']
})
export class CnpComponent {
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


  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'series': ['', Validators.compose([Validators.required, lengthValid2, inputTextValidator])],
      'number': ['', Validators.compose([Validators.required, inputNumberValidator, lengthValid6])],
      'cnp': ['', Validators.compose([Validators.required, cnpValid])],
      'lastName': ['', Validators.compose([Validators.required, inputTextValidator])],
      'firstName': ['', Validators.compose([Validators.required, inputTextValidator])],
      'nationality': ['', Validators.compose([Validators.required, inputTextValidator])],
      'birth': ['', Validators.compose([Validators.required, inputTextValidator])],
      'adress': ['', Validators.required],
      'issued': ['', Validators.compose([Validators.required, inputTextValidator])],
      'valid1': ['', Validators.required],
      'valid2': ['', Validators.required]
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
  onClick() {
    var buletine: any[];
    var key: string = 'vector';
    buletine = JSON.parse(localStorage.getItem(key));
    if (!buletine) {
      buletine = [];
    }
    buletine.push(this.myForm.value);
    localStorage.setItem(key, JSON.stringify(buletine));


  }


}

