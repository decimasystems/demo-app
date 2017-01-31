import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { Http, Response } from '@angular/http'
import { CnpValidator } from './cnp-validators';
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
    city: AbstractControl;
    street: AbstractControl;
    streetNr: AbstractControl;
    block: AbstractControl
    scale: AbstractControl;
    floor: AbstractControl;
    apartament: AbstractControl;
    valid1: AbstractControl;
    valid2: AbstractControl;
    issued: AbstractControl;
    village: AbstractControl;
    id: string;
    persoana: any;
    localitati: any;
    counties: any;
    submitted: boolean;
    url: string = 'http://localhost:4000/cards';
    countiesPath: string = 'http://localhost:4000/siruta/counties';
    buletine: any[];
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: Http) {
        this.submitted = false;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id) {
                if (this.id == 'adauga') {
                    this.persoana = {};
                    this.http.get(this.countiesPath).subscribe((res: Response) => {
                        this.counties = res.json();
                    })

                    this.buildForm();

                } else {
                    this.http.get(this.url + '/' + this.id).subscribe((response: Response) => {
                        this.persoana = response.json();
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
            'series': [this.persoana.series, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g), Validators.maxLength(2)])],
            'number': [this.persoana.number, Validators.compose([Validators.required, Validators.pattern(/[0-9]+/g), Validators.maxLength(6),])],
            'cnp': [this.persoana.cnp, Validators.compose([Validators.required, CnpValidator.cnpValid])],
            'lastName': [this.persoana.lastName, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'firstName': [this.persoana.firstName, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'nationality': [this.persoana.nationality, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'birth': [this.persoana.birth, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'county': [this.persoana.county, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'city': [this.persoana.city, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'street': [this.persoana.street, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'streetNr': [this.persoana.streetNr, Validators.compose([Validators.required, Validators.pattern(/[0-9]+/g)])],
            'block': [this.persoana.block],
            'scale': [this.persoana.scale, Validators.pattern(/[A-Za-z]+/g)],
            'floor': [this.persoana.floor, Validators.pattern(/[0-9]+/g)],
            'apartament': [this.persoana.apartament, Validators.pattern(/[0-9]+/g)],
            'issued': [this.persoana.issued, Validators.compose([Validators.required, Validators.pattern(/[A-Za-z]+/g)])],
            'valid1': [this.persoana.valid1, Validators.required],
            'valid2': [this.persoana.valid2, Validators.required],
            'village': [this.persoana.village]
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
        this.village = this.myForm.controls['village'];
        this.county.valueChanges.subscribe((value: string) => {
            this.http.get(this.countiesPath + '/' + value+'/loc').subscribe((response: Response) => {
                this.localitati = response.json();
            })
        })
       
    }

    addOrUpdateCnp() {
        this.submitted = true;
        if (this.series.value && this.number.value && this.county.value &&
            this.city.value && this.streetNr.value && this.birth.value && this.cnp.value && this.firstName.value && this.lastName.value && this.issued.value &&
            this.nationality.value && this.valid1.value && this.valid2.value) {
            if (this.id != 'adauga') {
                this.http.put(this.url + '/' + this.id, this.myForm.value).subscribe((res: Response) => {
                    this.router.navigate(['list']);
                });
            }
            else {
                this.http.post(this.url, this.myForm.value).subscribe((res: Response) => {
                    this.router.navigate(['list']);
                });
            }
        }

    }
}

