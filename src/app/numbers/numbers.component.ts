import { Component } from '@angular/core';
import { Numeral } from 'numbertowords/numeral.js';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent {
  message: string;
  nr: AbstractControl;
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.message = '';

    this.myForm = fb.group({
      '': ['', Validators.required]
    });
    this.nr = this.myForm.controls[''];
    this.nr.valueChanges.subscribe(
      (value: string) => {
        var numeral = new Numeral(value);
        this.message = numeral.ToWord();
        return this.message;
      });
  }
 }

