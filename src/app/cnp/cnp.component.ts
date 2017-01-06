import { Component} from '@angular/core';
import {CNP} from 'cnp.js/cnp.js';

import{FormGroup,AbstractControl,FormBuilder,Validators} from '@angular/forms'
@Component({
  selector: 'cnp',
  templateUrl: './cnp.component.html',
  styleUrls: ['./cnp.component.css']
})
export class CnpComponent {
 myForm:FormGroup;
 cnpInput:AbstractControl
  message: string;
  
  constructor(fb:FormBuilder) {
     this.myForm = fb.group({
      '':  ['', Validators.required]
     });
    this.cnpInput = this.myForm.controls[''];
     this.cnpInput.valueChanges.subscribe(
      (value: string) => {
        var cod=new CNP(value);
        if(cod.isValid)
        this.message="Cod valid!";
        else
        this.message="Cod invalid!";
        return this.message;
      }
    );
    
  }
    

}
