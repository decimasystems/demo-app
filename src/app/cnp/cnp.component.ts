import { Component } from '@angular/core';
import { CNP } from 'cnp.js/cnp.js';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms'
@Component({
  selector: 'cnp',
  templateUrl: './cnp.component.html',
  styleUrls: ['./cnp.component.css']
})
export class CnpComponent {
  myForm: FormGroup;
  cnpInput: AbstractControl;
  lastInput: AbstractControl;
  firstInput: AbstractControl;
  nationalityInput: AbstractControl;
  seriesInput:AbstractControl;
  numberInput:AbstractControl;
  adressInput:AbstractControl;
  validityInput:AbstractControl;
    validityInput2:AbstractControl;
  message: string;
message1: string;
message2: string;
message3: string;

message4: string;
message5: string;
  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'seriesInput':['', Validators.required],
        'numberInput':['', Validators.required],
        'cnpInput': ['', Validators.required],
      'lastInput': ['', Validators.required],
      'firstInput': ['', Validators.required],
      'nationalityInput': ['', Validators.required],
      'adressInput': ['', Validators.required],
       'validityInput': ['', Validators.required],
             'validityInput2': ['', Validators.required],
      
    })

    this.seriesInput=this.myForm.controls['seriesInput'];
     this.seriesInput.valueChanges.subscribe(
      (value: string) => {
       if(value.length==2&& isNaN(+value[0])&& isNaN(+value[1]))
       this.message1="Corect!";
       else
       this.message1="Incorect!"
      }
    );
    this.numberInput=this.myForm.controls['numberInput'];
     this.numberInput.valueChanges.subscribe(
      (value: string) => {
        if(value.length==6){
        for(var i=0;i<value.length;i++){
          if(isNaN(+value[i]))
          this.message="Incorect"
          else
          this.message="Corect!"
        }
      }
      return this.message;
      }
    );
        this.lastInput = this.myForm.controls['lastInput'];
    this.lastInput.valueChanges.subscribe(
      (value: string) => {
       for(var i=0;i<value.length;i++)
       {
         if(!isNaN(+value[i]))
         this.message2="Numele nu trebuie sa contina cifre!"
         else
         this.message2="Corect!"
       }
       return this.message2;
      }
    );
    this.firstInput = this.myForm.controls['firstInput'];
    this.firstInput.valueChanges.subscribe(
      (value: string) => {
       for(var i=0;i<value.length;i++)
       {
         if(!isNaN(+value[i]))
         this.message3="Numele nu trebuie sa contina cifre!"
         else
         this.message3="Corect!"
       }
       return this.message3;
      }
    );
    this.nationalityInput = this.myForm.controls['nationalityInput'];
    this.nationalityInput.valueChanges.subscribe(
      (value: string) => {
        for(var i=0;i<value.length;i++)
       {
         if(!isNaN(+value[i]))
         this.message4="Valoarea introdusa nu trebuie sa contina cifre!"
         else
         this.message4="Corect!"
       }
       return this.message4;
      }
    );
    this.cnpInput = this.myForm.controls['cnpInput'];
    this.cnpInput.valueChanges.subscribe(
      (value: string) => {
        var cod = new CNP(value);
        if (cod.isValid)
          this.message5 = "Cod valid!";
        else
          this.message5 = "Cod invalid!";
        return this.message5;
      }
    );
    this.adressInput=this.myForm.controls['adressInput'];
this.validityInput=this.myForm.controls['validityInput'];
this.validityInput2=this.myForm.controls['validityInput2'];
  }

}
