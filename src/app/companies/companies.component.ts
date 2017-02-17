import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  id: string;
  url: string = "http://localhost:4000/firme";
  company: any = {};
  myForm: FormGroup;
  denumire: AbstractControl;
  CUI: AbstractControl;
  cod_inmatriculare: AbstractControl;
  stare_firma: AbstractControl;
  judet: AbstractControl;
  localitate: AbstractControl;
  sirutaJudet: AbstractControl;
  sirutaLocalitate: AbstractControl;
  street: AbstractControl;
  streetNr: AbstractControl;
  block: AbstractControl;
  entrance: AbstractControl;
  floor: AbstractControl;
  apartament: AbstractControl;
  telephone: AbstractControl;
  email: AbstractControl;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: Http,private router:Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      //this.http.get(this.url + '/store').subscribe((res: Response) => {
      //  console.log(res.statusText);
        this.http.get(this.url + '/company/' + this.id).subscribe((response: Response) => {
          this.company = response.json();
          this.buildForm();
        });
     // })

    })

  }
  buildForm() {
    this.myForm = this.fb.group({
      
      'denumire': [this.company.DENUMIRE],
      'CUI': [this.company.CUI],
      'cod_inmatriculare': [this.company.COD_INMATRICULARE],
      'stare_firma': [this.company.STARE_FIRMA],
      'judet': [this.company.JUDET],
      'localitate': [this.company.LOCALITATE],
      'sirutaJudet': [this.company.sirutaJudet],
      'sirutaLocalitate': [this.company.sirutaLocalitate],
      'street': [this.company.street],
      'streetNr': [this.company.streetNr],
      'block': [this.company.block],
      'entrance': [this.company.entrance],
      'floor': [this.company.floor],
      'apartament': [this.company.apartament],
      'telephone': [this.company.telephone],
      'email': [this.company.email]
    });
    this.denumire = this.myForm.controls['denumire'];
    this.CUI = this.myForm.controls['CUI'];
    this.cod_inmatriculare = this.myForm.controls['cod_inmatriculare'];
    this.stare_firma = this.myForm.controls['stare_firma'];
    this.judet = this.myForm.controls['judet'];
    this.localitate = this.myForm.controls['localitate'];
    this.sirutaJudet = this.myForm.controls['sirutaJudet'];
    this.sirutaLocalitate = this.myForm.controls['sirutaLocalitate'];
    this.street = this.myForm.controls['street'];
    this.streetNr = this.myForm.controls['streetNr'];
    this.block = this.myForm.controls['block'];
    this.entrance = this.myForm.controls['entrance'];
    this.floor = this.myForm.controls['floor'];
    this.apartament = this.myForm.controls['apartament'];
    this.telephone = this.myForm.controls['telephone'];
    this.email=this.myForm.controls['email'];
  }
  adauga(){
    this.http.post(this.url+'/companyUpdated',this.myForm.value).subscribe((response:Response)=>{
      response.json();
      this.router.navigate(['./search-company']);
    });
  }
}
