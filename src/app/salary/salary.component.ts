import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms'
import { CnpValidator } from '../cnp-add/cnp-validators'

declare let pdfMake: any;

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
    dpp: AbstractControl
    nl: AbstractControl
    tl: AbstractControl
    ss: AbstractControl
    retineri: AbstractControl
    numeA: AbstractControl
    numeF: AbstractControl
    luna: AbstractControl
    luni: any = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie']
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
            'ambp': ['', Validators.required],
            'dpp': ['300', Validators.required],
            'nl': ['', Validators.required],
            'tl': ['', Validators.required],
            'ss': ['', Validators.required],
            'retineri': ['', Validators.required],
            'numeA': ['', Validators.required],
            'numeF': ['', Validators.required],
            'luna': ['', Validators.required]
        });
        this.tl = this.myForm.controls['tl']
        this.nl = this.myForm.controls['nl']
        this.ss = this.myForm.controls['ss']
        this.retineri = this.myForm.controls['retineri']
        this.numeA = this.myForm.controls['numeA']
        this.numeF = this.myForm.controls['numeF']
        this.luna = this.myForm.controls['luna']
        this.salaryB = this.myForm.controls['salaryB'];
        this.salaryN = this.myForm.controls['salaryN'];
        this.salaryC = this.myForm.controls['salaryC'];
        this.casa = this.myForm.controls['casa'];
        this.dpp = this.myForm.controls['dpp'];
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
                this.dp.patchValue(this.computeDp(value, this.dpp.value));
                this.patchFloatValue(value, 'casaP','casa');
                this.patchFloatValue(value, 'cassaP','cassa');
                this.patchFloatValue(value, 'cfsaP','cfsa');
                this.patchFloatValue(value, 'ivP','iv');
                this.patchFloatValue(value, 'casP','cas');
                this.patchFloatValue(value, 'cassP','cass');
                this.patchFloatValue(value, 'cfsP','cfs');
                this.patchFloatValue(value, 'cciP','cci');
                this.patchFloatValue(value, 'fgpcsP','fgpcs');
                this.patchFloatValue(value, 'ambpP','ambp');
                this.iv.patchValue(((value - this.casa.value - this.cassa.value - this.cfsa.value - this.dp.value) * this.ivP.value * 0.01).toFixed(2))
                this.salaryN.patchValue((value - this.casa.value - this.cassa.value - this.cfsa.value - this.iv.value).toFixed(2))
                var y=(+value + +this.cas.value + +this.cass.value + +this.cfs.value + +this.cci.value + +this.fgpcs.value + +this.ambp.value).toFixed(2);
                this.salaryC.patchValue(y);

                this.ss.patchValue((value / this.nl.value) * (this.tl.value - this.nl.value) * (this.ss.value + 100) / 100)
            })
        this.dp.valueChanges.subscribe(
            (value) => {
                this.iv.patchValue((this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - value) * this.ivP.value * 0.01, true)
                this.salaryN.patchValue(this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - this.iv.value, true)
            })
        this.casaP.valueChanges.subscribe((value) => {
            this.casa.patchValue(this.salaryB.value * value * 0.01, true)
            this.iv.patchValue((this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - this.dp.value) * this.ivP.value * 0.01, true)
            this.salaryN.patchValue(this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - this.iv.value, true)
        })
        this.cassaP.valueChanges.subscribe((value) => {
            this.cassa.patchValue(this.salaryB.value * value * 0.01, true)
            this.iv.patchValue((this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - this.dp.value) * this.ivP.value * 0.01, true)
            this.salaryN.patchValue(this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - this.iv.value, true)
        })
        this.cfsaP.valueChanges.subscribe((value) => {
            this.cfsa.patchValue(this.salaryB.value * value * 0.01, true)
            this.iv.patchValue((this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - this.dp.value) * this.ivP.value * 0.01, true)
            this.salaryN.patchValue(this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - this.iv.value, true)
        })
        this.dp.valueChanges.subscribe((value) => {
            this.iv.patchValue((this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - value) * this.ivP.value * 0.01, true)
            this.salaryN.patchValue(this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - this.iv.value, true)
        })
        this.ivP.valueChanges.subscribe((value) => {
            this.iv.patchValue((this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - this.dp.value) * value * 0.01, true)
            this.salaryN.patchValue(this.salaryB.value - this.casa.value - this.cassa.value - this.cfsa.value - this.iv.value, true)
        })
        this.casP.valueChanges.subscribe((value) => {
            this.cas.patchValue(this.salaryB.value * value * 0.01, true)
            this.salaryC.patchValue(this.salaryB.value + this.cas.value + this.cass.value + this.cfs.value + this.cci.value + this.fgpcs.value + this.ambp.value)
        })
        this.cassP.valueChanges.subscribe((value) => {
            this.cass.patchValue(this.salaryB.value * value * 0.01, true)
            this.salaryC.patchValue(this.salaryB.value + this.cas.value + this.cass.value + this.cfs.value + this.cci.value + this.fgpcs.value + this.ambp.value)
        })
        this.cfsP.valueChanges.subscribe((value) => {
            this.cfs.patchValue(this.salaryB.value * value * 0.01, true)
            this.salaryC.patchValue(this.salaryB.value + this.cas.value + this.cass.value + this.cfs.value + this.cci.value + this.fgpcs.value + this.ambp.value)
        })
        this.cciP.valueChanges.subscribe((value) => {
            this.cci.patchValue(this.salaryB.value * value * 0.01, true)
            this.salaryC.patchValue(this.salaryB.value + this.cas.value + this.cass.value + this.cfs.value + this.cci.value + this.fgpcs.value + this.ambp.value)
        })
        this.fgpcsP.valueChanges.subscribe((value) => {
            this.fgpcs.patchValue(this.salaryB.value * value * 0.01, true)
            this.salaryC.patchValue(this.salaryB.value + this.cas.value + this.cass.value + this.cfs.value + this.cci.value + this.fgpcs.value + this.ambp.value)
        })
        this.ambpP.valueChanges.subscribe((value) => {
            this.ambp.patchValue(this.salaryB.value * value * 0.01)
            this.salaryC.patchValue(this.salaryB.value + this.cas.value + this.cass.value + this.cfs.value + this.cci.value + this.fgpcs.value + this.ambp.value)
        })
        this.dpp.valueChanges.subscribe((value) => {
            this.dp.patchValue(this.computeDp(this.salaryB.value, value))
        })

    }
    computeDp(salary, dppval) {
        var s;
        var dpval = 0;
        if (salary <= 1500)
            s = 1500;
        else if (salary >= 1501 && salary <= 3000)
            s = salary;
        else
            s = 0;
        dpval = dppval * (1 - (s - 1500) / 1500);
        dpval = Math.ceil(dpval / 10) * 10
        return dpval
    }
    patchFloatValue(value, percentControlName: string,valueControlName:string) {
        var percent = this.myForm.controls[percentControlName].value*0.01;
        var x=(value*percent).toFixed(2);
        this.myForm.controls[valueControlName].patchValue(x, true);

    }
    genereaza() {
        var fluturas={content:'Salariu de baza'}
        pdfMake.createPdf(fluturas).open();
    }

}
