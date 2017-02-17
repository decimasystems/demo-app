import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { Http, Response } from '@angular/http'
import { CnpValidator } from './cnp-validators';
@Component({
    selector: 'cnp',
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
    city: AbstractControl;
    street: AbstractControl;
    streetNr: AbstractControl;
    block: AbstractControl
    entrance: AbstractControl;
    floor: AbstractControl;
    apartament: AbstractControl;
    valid1: AbstractControl;
    valid2: AbstractControl;
    issued: AbstractControl;
    village: AbstractControl;
    id: string;
    card: any;
    villages: any;
    counties: any;
    submitted: boolean;
    url: string = 'http://localhost:4000/cards';
    countiesPath: string = 'http://localhost:4000/siruta/counties';
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: Http) {
        this.submitted = false;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id) {
                if (this.id == 'adauga') {
                    this.card = {};
                    this.http.get(this.countiesPath).subscribe((res: Response) => {
                        this.counties = res.json();
                    });
                    this.buildForm();

                } else {
                    this.http.get(this.url + '/card/' + this.id).subscribe((response: Response) => {
                        this.card = response.json();
                        this.http.get(this.countiesPath).subscribe((res: Response) => {
                            this.counties = res.json();
                        })
                        this.buildForm();
                    });
                }

            }
        });
    }
    buildForm() {
        this.myForm = this.fb.group({
            'series': [this.card.series, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g), Validators.maxLength(2)])],
            'number': [this.card.number, Validators.compose([Validators.required, Validators.pattern(/[0-9]+/g), Validators.maxLength(6),])],
            'cnp': [this.card.cnp, Validators.compose([Validators.required, CnpValidator.cnpValid])],
            'lastName': [this.card.lastName, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'firstName': [this.card.firstName, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'nationality': [this.card.nationality, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'birth': [this.card.birth, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'county': [this.card.county, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'city': [this.card.city, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'street': [this.card.street,  Validators.pattern(/[A-Za-z]+/g)],
            'streetNr': [this.card.streetNr, Validators.compose([Validators.required, Validators.pattern(/[0-9]+/g)])],
            'block': [this.card.block],
            'entrance': [this.card.entrance, Validators.pattern(/[A-Za-z]+/g)],
            'floor': [this.card.floor, Validators.pattern(/[0-9]+/g)],
            'apartament': [this.card.apartament, Validators.pattern(/[0-9]+/g)],
            'issued': [this.card.issued, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'valid1': [this.card.valid1, Validators.required],
            'valid2': [this.card.valid2, Validators.required],
            'village': [this.card.village]
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
        this.entrance = this.myForm.controls['entrance'];
        this.floor = this.myForm.controls['floor'];
        this.apartament = this.myForm.controls['apartament'];
        this.birth = this.myForm.controls['birth'];
        this.valid1 = this.myForm.controls['valid1'];
        this.valid2 = this.myForm.controls['valid2'];
        this.issued = this.myForm.controls['issued'];
        this.village = this.myForm.controls['village'];
        this.county.valueChanges.subscribe((value: string) => {
            this.http.get(this.countiesPath + '/' + value).subscribe((response: Response) => {
                this.villages = response.json();
            })
        })
        this.http.get(this.countiesPath + '/' + this.county.value).subscribe((response: Response) => {
            this.villages = response.json();
        })

    }

    addOrUpdateCnp() {
        this.submitted = true;
        if (this.series.value && this.number.value && this.county.value &&
            this.city.value && this.streetNr.value && this.birth.value && this.cnp.value && this.firstName.value && this.lastName.value && this.issued.value &&
            this.nationality.value && this.valid1.value && this.valid2.value) {
            if (this.id != 'adauga') {
                this.http.put(this.url + '/card/' + this.id, this.myForm.value).subscribe((res: Response) => {
                    this.router.navigate(['list']);
                });
            }
            else {
                this.http.post(this.url+'/card', this.myForm.value).subscribe((res: Response) => {
                    this.router.navigate(['list']);
                });
            }
        }

    }
}

