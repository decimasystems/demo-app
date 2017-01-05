import { Component } from '@angular/core';
import { Numeral } from 'numbertowords/numeral.js';

@Component({
  selector: 'numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent {
  message: string;
  nr: any;
  constructor() {
    this.message = '';

  }

  onclick() {

    var numeral = new Numeral(this.nr);
    this.message = numeral.ToWord();
  }

}