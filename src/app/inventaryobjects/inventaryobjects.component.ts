import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Numeral } from 'numbertowords/numeral.js';

@Component({
    selector: 'inventaryobjects',
    templateUrl: './inventaryobjects.component.html',
    styleUrls: ['./inventaryobjects.component.css']
})
export class InventaryobjectsComponent implements OnInit {

    myForm: FormGroup;
    nr: AbstractControl;
    title: AbstractControl;
    description: AbstractControl;
    unit: AbstractControl;
    price: AbstractControl;
    currency: AbstractControl;
    pieces: AbstractControl;
    period: AbstractControl;
    pricewords: AbstractControl;
    id: any;
    inventary: any[] = [];
    element: any;
    key: string;


    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.key = 'inv';
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id) {
                if (this.id == 'adauga') {
                    this.element = {};
                } else {
                    this.inventary = JSON.parse(localStorage.getItem('inv'));
                    console.log(this.inventary);
                    this.element = _.find(this.inventary, { 'nr': +this.id });
                    console.log(this.element);
                }
                this.buildForm();
            }
        });
    }

    buildForm() {
        this.myForm = this.fb.group({
            'nr': [this.element.nr, Validators.required],
            'title': [this.element.title, Validators.required],
            'description': [this.element.description, Validators.required],
            'unit': [this.element.unit, Validators.required],
            'price': [this.element.price, Validators.required],
            'currency': [this.element.currency, Validators.required],
            'pieces': [this.element.pieces, Validators.required],
            'period': [this.element.period, Validators.required],
            'pricewords': [this.element.pricewords, Validators.required]
        });

        this.nr = this.myForm.controls['nr'];
        this.title = this.myForm.controls['title'];
        this.description = this.myForm.controls['description'];
        this.unit = this.myForm.controls['unit'];
        this.price = this.myForm.controls['price'];
        this.currency = this.myForm.controls['currency'];
        this.pieces = this.myForm.controls['pieces'];
        this.period = this.myForm.controls['period'];
        this.pricewords = this.myForm.controls['pricewords'];

        this.price.valueChanges.subscribe(
            (pvalue: string) => {
                this.showmessage();
            });
        this.currency.valueChanges.subscribe(
            (cvalue: string) => {
                this.showmessage();
            });

    }

    showmessage() {
        var message: string;
        var cvalue = this.currency.value;
        var numeral = new Numeral(this.price.value);
        if (cvalue == 'RON') {
            message = numeral.convertMoney('leu', 'lei', 'ban', 'bani', ',', '.', ' ');
        } else if (cvalue == 'EUR') {
            message = numeral.convertMoney('euro', 'euro', 'eurocent', 'eurocenti', ',', '.', ' ');
        } else if (cvalue == 'USD') {
            message = numeral.convertMoney('dolar', 'dolari', 'cent', 'centi', ',', '.', ' ');
        } else if (cvalue == 'GBP') {
            message = numeral.convertMoney('lira', 'lire', 'cent', 'centi', ',', '.', ' ');
        }
        this.pricewords.patchValue(message, true);
    }

    addObject() {
        this.inventary = JSON.parse(localStorage.getItem(this.key));
        /*if (!inventary) {
            inventary = [];
        }*/
        if (this.myForm.valid) {
            if (this.id != 'adauga') {
                this.element = _.findIndex(this.inventary, { 'nr': +this.id });
                this.inventary[this.element] = this.myForm.value;
            } else {
                this.inventary.push(this.myForm.value);
            }

            localStorage.setItem(this.key, JSON.stringify(this.inventary));
            this.router.navigate(['inventarylist']);
        }
    }
}