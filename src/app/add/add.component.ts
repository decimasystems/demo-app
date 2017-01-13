import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { CNP } from 'cnp.js/cnp.js';
var _ = require('lodash');
function inputTextValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value && control.value.search(/[A-Za-z]/))
        return { invalidInput: true };
}
function inputNumberValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value && control.value.search(/[0-9]/))
        return { validNumber: true };
}
function lengthValid2(control: FormControl): { [s: string]: boolean } {
    if (control.value && control.value.length != 2)
        return { validLength: true };
}
function lengthValid6(control: FormControl): { [s: string]: boolean } {
    if (control.value && control.value.length != 6)
        return { validLength6: true };
}
function cnpValid(control: FormControl): { [s: string]: boolean } {
    if(control.value){
    var cod = new CNP(control.value);
    if (!cod.isValid)
        return { codValid: true };
    }
}
@Component({
    selector: 'add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddComponent {
    myForm: FormGroup;
    cnp: AbstractControl;
    lastName: AbstractControl;
    firstName: AbstractControl;
    nationality: AbstractControl;
    series: AbstractControl;
    number: AbstractControl;
    birth: AbstractControl;
    county: AbstractControl;
    city: AbstractControl
    street: AbstractControl
    streetNr: AbstractControl
    block: AbstractControl
    scale: AbstractControl;
    floor: AbstractControl;
    apartament: AbstractControl;
    valid1: AbstractControl;
    valid2: AbstractControl;
    issued: AbstractControl;
    display: boolean;
    id: string;
    buletin: any[] = [];
    persoana: any;
    key: string = 'vector';

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id']
            if (this.id) {
                if (this.id == 'adauga') {
                    this.persoana = {};
                } else {
                    this.buletin = JSON.parse(localStorage.getItem(this.key))
                    this.persoana = _.find(this.buletin, { 'cnp': this.id})
                }
                this.buildForm();
            }
        });
    }
    buildForm() {
        this.myForm = this.fb.group({
            'series': [this.persoana.series, Validators.compose([Validators.required, inputTextValidator])],
            'number': [this.persoana.number, Validators.compose([Validators.required, inputNumberValidator, lengthValid6])],
            'cnp': [this.persoana.cnp, Validators.compose([Validators.required, cnpValid])],
            'lastName': [this.persoana.lastName, Validators.compose([Validators.required, inputTextValidator])],
            'firstName': [this.persoana.firstName, Validators.compose([Validators.required, inputTextValidator])],
            'nationality': [this.persoana.nationality, Validators.compose([Validators.required, inputTextValidator])],
            'birth': [this.persoana.birth, Validators.compose([Validators.required, inputTextValidator])],
            'county': [this.persoana.county, Validators.compose([Validators.required, inputTextValidator])],
            'city': [this.persoana.city, Validators.compose([Validators.required, inputTextValidator])],
            'street': [this.persoana.street, Validators.compose([Validators.required, inputTextValidator])],
            'streetNr': [this.persoana.streetNr, Validators.compose([Validators.required, inputNumberValidator])],
            'block': [this.persoana.block, Validators.required],
            'scale': [this.persoana.scale, Validators.compose([Validators.required, inputTextValidator])],
            'floor': [this.persoana.floor, Validators.compose([Validators.required, inputNumberValidator])],
            'apartament': [this.persoana.apartament, Validators.compose([Validators.required, inputNumberValidator])],
            'issued': [this.persoana.issued, Validators.compose([Validators.required, inputTextValidator])],
            'valid1': [this.persoana.valid1, Validators.required],
            'valid2': [this.persoana.valid2, Validators.required]
        })
        this.series = this.myForm.controls['series'];

        this.number = this.myForm.controls['number'];

        this.lastName = this.myForm.controls['lastName'];

        this.firstName = this.myForm.controls['firstName'];

        this.nationality = this.myForm.controls['nationality'];

        this.cnp = this.myForm.controls['cnp'];

        this.county = this.myForm.controls['county'];

        this.city = this.myForm.controls['city'];

        this.street = this.myForm.controls['street'];

        this.streetNr = this.myForm.controls['streetNr'];

        this.block = this.myForm.controls['block'];

        this.scale = this.myForm.controls['scale'];

        this.floor = this.myForm.controls['floor'];

        this.apartament = this.myForm.controls['apartament'];

        this.birth = this.myForm.controls['birth'];

        this.valid1 = this.myForm.controls['valid1'];

        this.valid2 = this.myForm.controls['valid2'];

        this.issued = this.myForm.controls['issued'];
    }



    why() {
        this.display = true;
        var buletine: any[];
        var key: string = 'vector';
        buletine = JSON.parse(localStorage.getItem(key));
        if (!buletine) {
            buletine = [];
        }
        if (this.series.value && this.number.value && this.county.value &&
            this.city.value && this.street.value && this.streetNr.value && this.block.value &&
            this.scale.value && this.floor.value &&
            this.apartament.value && this.birth.value && this.cnp.value && this.firstName.value && this.lastName.value && this.issued.value &&
            this.nationality.value && this.valid1.value && this.valid2.value) {
            buletine.push(this.myForm.value);
            localStorage.setItem(key, JSON.stringify(buletine));
            this.router.navigate(['list'])
        }
    }
}

