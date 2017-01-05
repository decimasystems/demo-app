import { Component} from '@angular/core';
import {CNP} from 'cnp.js/cnp.js';
@Component({
  selector: 'cnp',
  templateUrl: './cnp.component.html',
  styleUrls: ['./cnp.component.css']
})
export class CnpComponent {
  cnpInput:string;
  message: string;
  
  constructor() {}

  onClick(){
    var cod=new CNP(this.cnpInput);
    this.message = '';
    if (cod.isValid)
      this.message = "Valid!";
    else
      this.message = "Invalid!";

  }

}
