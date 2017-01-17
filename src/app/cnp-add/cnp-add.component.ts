import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { CnpValidator } from './cnp-validators';
var _ = require('lodash');

@Component({
    selector: 'add',
    templateUrl: './cnp-add.component.html',
    styleUrls: ['./cnp-add.component.css']
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
    id: string;
    buletin: any[] = [];
    persoana: any;
    key: string = 'vector';
    localitati:any[];
    submitted: boolean;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.submitted = false;
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
                 this.localitati=['Salcea','Plopeni','Solca','Gura-Humorului','Putna','Cacica','Buftea','Afumati','Chitila','Copaceni']
    
            }
        });

    }
    buildForm() {
        this.myForm = this.fb.group({
            'series': [this.persoana.series, Validators.compose([Validators.required, CnpValidator.inputTextValidator])],
            'number': [this.persoana.number, Validators.compose([Validators.required, CnpValidator.inputNumberValidator, CnpValidator.lengthValid6])],
            'cnp': [this.persoana.cnp, Validators.compose([Validators.required, CnpValidator.cnpValid])],
            'lastName': [this.persoana.lastName, Validators.compose([Validators.required, CnpValidator.inputTextValidator])],
            'firstName': [this.persoana.firstName, Validators.compose([Validators.required, CnpValidator.inputTextValidator])],
            'nationality': [this.persoana.nationality, Validators.compose([Validators.required, CnpValidator.inputTextValidator])],
            'birth': [this.persoana.birth, Validators.compose([Validators.required, CnpValidator.inputTextValidator])],
            'county': [this.persoana.county, Validators.compose([Validators.required, CnpValidator.inputTextValidator])],
            'city': [this.persoana.city, Validators.compose([Validators.required, CnpValidator.inputTextValidator])],
            'street': [this.persoana.street, Validators.compose([Validators.required, CnpValidator.inputTextValidator])],
            'streetNr': [this.persoana.streetNr, Validators.compose([Validators.required, CnpValidator.inputNumberValidator])],
            'block': [this.persoana.block, Validators.required],
            'scale': [this.persoana.scale, Validators.compose([Validators.required, CnpValidator.inputTextValidator])],
            'floor': [this.persoana.floor, Validators.compose([Validators.required, CnpValidator.inputNumberValidator])],
            'apartament': [this.persoana.apartament, Validators.compose([Validators.required, CnpValidator.inputNumberValidator])],
            'issued': [this.persoana.issued, Validators.compose([Validators.required, CnpValidator.inputTextValidator])],
            'valid1': [this.persoana.valid1, Validators.required],
            'valid2': [this.persoana.valid2, Validators.required]
        });

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



    addOrUpdateCnp() {
        this.submitted = true;
        var buletine: any[];
        var key: string = 'vector';
        buletine = JSON.parse(localStorage.getItem(key));
        if (!buletine) {
            buletine = [];
        }
        if (this.myForm.valid) {
            buletine.push(this.myForm.value);
            localStorage.setItem(key, JSON.stringify(buletine));
            this.router.navigate(['list'])
        }
    }
}

