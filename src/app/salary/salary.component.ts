import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms'

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}
function inputNumberValidator(control: FormControl): { [s: string]: boolean } {
  if (isEmptyInputValue(control.value)) {
    return null;  // don't validate empty values to allow optional controls
  }
  if (control.value.search(/[0-9]/))
    return { validNumber: true };
}
import { CnpValidator } from '../cnp-add/cnp-validators'
@Component({
  selector: 'salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  myForm: FormGroup;
  salaryB: AbstractControl;
  salaryN: AbstractControl;
  salaryC: AbstractControl;
  casa: AbstractControl;
  cassa: AbstractControl;
  cassaP: AbstractControl
  cfsa: AbstractControl;
  dp: AbstractControl;
  iv: AbstractControl;
  cas: AbstractControl;
  cass: AbstractControl;
  cfs: AbstractControl;
  cci: AbstractControl;
  fgpcs: AbstractControl;
  ambp: AbstractControl;
  casaP: AbstractControl;
  cfsaP: AbstractControl;
  ivP: AbstractControl
  casP: AbstractControl;
  cassP: AbstractControl
  cfsP: AbstractControl
  cciP: AbstractControl
  fgpcsP: AbstractControl
  ambpP: AbstractControl
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      'salaryB': ['', Validators.required],
      'salaryN': ['', Validators.required],
      'salaryC': ['', Validators.required],
      'casa': ['', Validators.required],
      'casaP': ['10.5', Validators.required],
      'cassa': ['', Validators.required],
      'cassaP': ['5.5', Validators.required],
      'cfsa': ['', Validators.required],
      'cfsaP': ['0.5', Validators.required],
      'dp': ['', Validators.required],
      'iv': ['', Validators.required],
      'ivP': ['16', Validators.required],
      'cas': ['', Validators.required],
      'casP': ['15.8', Validators.required],
      'cass': ['', Validators.required],
      'cassP': ['5.2', Validators.required],
      'cfs': ['', Validators.required],
      'cfsP': ['0.5', Validators.required],
      'cci': ['', Validators.required],
      'cciP': ['0.85', Validators.required],
      'fgpcs': ['', Validators.required],
      'fgpcsP': ['0.25', Validators.required],
      'ambpP': ['0.15', Validators.required],
      'ambp': ['', Validators.required]
    });
    this.salaryB = this.myForm.controls['salaryB'];
    this.salaryN = this.myForm.controls['salaryN'];
    this.salaryC = this.myForm.controls['salaryC'];
    this.casa = this.myForm.controls['casa'];

    this.cassa = this.myForm.controls['cassa'];
    this.cassaP = this.myForm.controls['cassaP']
    this.cfsa = this.myForm.controls['cfsa'];
    this.dp = this.myForm.controls['dp'];
    this.iv = this.myForm.controls['iv'];
    this.cas = this.myForm.controls['cas'];
    this.cass = this.myForm.controls['cass'];
    this.cfs = this.myForm.controls['cfs'];
    this.cci = this.myForm.controls['cci'];
    this.fgpcs = this.myForm.controls['fgpcs'];
    this.ambp = this.myForm.controls['ambp']
    this.casaP = this.myForm.controls['casaP'];
    this.cfsaP = this.myForm.controls['cfsaP'];
    this.ivP = this.myForm.controls['ivP'];
    this.casP = this.myForm.controls['casP'];
    this.cassP = this.myForm.controls['cassP']
    this.cfsP = this.myForm.controls['cfsP']
    this.cciP = this.myForm.controls['cciP']
    this.fgpcsP = this.myForm.controls['fgpcsP']
    this.ambpP = this.myForm.controls['ambpP']
    this.salaryB.valueChanges.subscribe(
      (value) => {
        this.casa.patchValue(value * this.casaP.value * 0.01, true)
        this.cassa.patchValue(value * this.cassaP.value * 0.01, true)
        this.cfsa.patchValue(value * this.cfsaP.value * 0.01, true)
        this.iv.patchValue((value - this.casa.value - this.cassa.value - this.cfsa.value - this.dp.value) * this.ivP.value * 0.01, true)
        this.salaryN.patchValue(value - this.casa.value - this.cassa.value - this.cfsa.value - this.iv.value, true)
        this.cas.patchValue(value * this.casaP.value * 0.01, true)
        this.cass.patchValue(value * this.cassaP.value * 0.01, true)
        this.cfs.patchValue(value * this.cfsaP.value * 0.01, true)
        this.cci.patchValue(value * this.cciP.value * 0.01, true)
        this.fgpcs.patchValue(value * this.fgpcsP.value * 0.01, true)
        this.ambp.patchValue(value * this.ambpP.value * 0.01, true)
        this.salaryC.patchValue(value + this.cas.value + this.cass.value + this.cfs.value + this.cci.value + this.fgpcs.value + this.ambp.value)
      })
    this.dp.valueChanges.subscribe(
      (value) => {
        this.iv.patchValue((this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - value) * this.ivP.value * 0.01, true)
        this.salaryN.patchValue(this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - this.iv.value, true)
      }
    )

  }

}
